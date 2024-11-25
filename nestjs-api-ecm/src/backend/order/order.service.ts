import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {DataSource, Repository} from 'typeorm';
import {OrderEntity} from 'src/entities/order_entity/oder.entity';
import {Order_productEntity} from 'src/entities/order_entity/order_product.entity';
import {CreateOrderDto} from 'src/dto/orderDTO/order.create.dto';
import {OrderAllOrderDto} from 'src/dto/orderDTO/order.allOrder.dto';
import {UpdateOrderDTO} from 'src/dto/orderDTO/order.update.dto';
import {NotificationType, OrderStatus, PaymentStatus} from "src/share/Enum/Enum";
import {OrderRepository} from "src/repository/OrderRepository";
import {BaseService} from "src/base/baseService/base.service";
import {NotificationService} from "src/backend/notification/notification.service";
import {UserRepository} from "src/repository/UserRepository";
import {User} from "src/entities/user_entity/user.entity";
import {WebsocketGateway} from "src/share/WebsocketGateway";
import {EmailService} from "src/backend/email/email.service";
import {Email_entity} from "src/entities/helper/email_entity";
import {AccountNotify} from "src/Until/configConst";

@Injectable()
export class OrderService extends BaseService<OrderEntity>{
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepo: OrderRepository,
    @InjectRepository(Order_productEntity)
    private readonly orderProductRepo: Repository<Order_productEntity>,
    @InjectRepository(User)
    private readonly userRepo: UserRepository,
    private readonly dataSource: DataSource,
    private readonly notiService: NotificationService,
    private readonly emailService: EmailService,
    private readonly websocketGateway: WebsocketGateway
  ) {
    super(orderRepo);
  }

  async createOrder(oderDTO: CreateOrderDto) {
    // Start transaction
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const order = this.orderRepo.create({
        total_price: oderDTO.totalPrice,
        orderStatus: OrderStatus.Checking,
        payment_method: oderDTO.paymentMethod,
        employee_id: null,
        user_id: oderDTO.user_id,
        location_id: oderDTO.location_id,
        paymentStatus: oderDTO.paymentStatus
      });

      const orderData = await queryRunner.manager.save(order);

      const order_products = oderDTO.products.map((item) => {
        return this.orderProductRepo.create({
          quantity: item.quantity,
          priceout: item.priceout,
          product_id: item.product_id,
          order_id: orderData.id,
        });
      });

      await queryRunner.manager.save(order_products);
      // Commit transaction
      await queryRunner.commitTransaction();

      //Tạo thông báo có order mới
      await this.createNotificationOrderSuccess(order);

      return orderData;
    } catch (e) {
      // Rollback transaction on error
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(
        'ORDER.OCCUR ERROR WHEN SAVE TO DATABASE!',
      );
    } finally {
      await queryRunner.release();
    }
  }

  async createNotificationOrderSuccess(order: OrderEntity){
    const user = await this.userRepo.findOneBy({id: order.user_id});
    const message = `Bạn có đơn hàng mới từ khách hàng ${user.firstName + " " + user.lastName}`;

    // Lấy danh sách admin từ cơ sở dữ liệu
    const admins = await this.userRepo.find({
      where: { role: 'admin', isActive: true }
    });
    const emailList = admins.map(admin => admin?.email);
    await this.notiService.createNotification(order.id, message, admins, NotificationType.NewOrder);

    const adminOnlines = this.websocketGateway.adminOnlines(emailList); // Lấy danh sách admin online
    const offlineAdmins = emailList.filter((email) => !adminOnlines.includes(email)); // Lấy danh sách admin offline

    if (adminOnlines.length > 0) {
      this.websocketGateway.notifyAdmin(adminOnlines, message); // Gửi WebSocket nếu online
    }

    if (offlineAdmins.length > 0) {
      const emailEntities: Email_entity[] = offlineAdmins.map((adminEmail) => {
        const email = new Email_entity();
        email.emailSend = AccountNotify.USER;     // Email gửi
        email.emailReceive = adminEmail;         // Email nhận
        email.header = 'Thông báo từ hệ thống';  // Tiêu đề email
        email.content = message;                 // Nội dung dạng text
        email.htmlContent = `<p>${message}</p>`; // Nội dung HTML
        return email;
      });

      await this.emailService.sendNotificationEmail(emailEntities); // Gửi email nếu offline
    }

  }

  async getAllOrder(allOderDTO: OrderAllOrderDto) {
    const [productOrders, totalOrders] = await this.orderRepo.findAndCount({
      where: { user_id: allOderDTO.user_id },
      relations: ['orderProducts'],
      skip: (allOderDTO.page - 1) * allOderDTO.limit,
      take: allOderDTO.limit,
    });

    return {
      list: productOrders,
      total: totalOrders,
    };
  }

  async getOrderManagement(page: number = 1, limit: number = 10, filters: any) {
    if (page < 1) {
      throw new Error('PAGE NUMBER MUST BE GREATER THAN 0!');
    }
    if (limit < 1) {
      throw new Error('LIMIT MUST BE GREATER THAN 0!');
    }
    const condition: any = {};

    if (filters.orderStatus && Object.values(OrderStatus).includes(filters.orderStatus)) {
      condition.orderStatus = filters.orderStatus;
    }
    if (filters.paymentStatus && Object.values(PaymentStatus).includes(filters.paymentStatus)) {
      condition.paymentStatus = filters.paymentStatus;
    }

    const [orders, totalOrders] = await this.orderRepo.findAndCount({
      where: condition,
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      orders: orders,
      total: totalOrders,
    };
  }

  async getDetail(order_id: string) {
    const order = await this.orderRepo.findOne({
      where: { id: order_id },
      relations: ['orderProducts', 'location'],
    });

    if (!order) {
      throw new Error('ORDER.ORDER DETAIL NOT EXSIST!');
    }
    return order;
  }

  async updateOrder(updateOrderDTO: UpdateOrderDTO) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const order = await this.orderRepo.findOne({
        where: {id: updateOrderDTO.order_id},
        relations: ['Order_productEntity'],
      });

      if (!order) {
        throw new Error('ORDER.ORDER UPDATE NOT FOUND!');
      }

      order.total_price = updateOrderDTO.totalPrice;
      order.payment_method = updateOrderDTO.paymentMethod;
      order.orderStatus = updateOrderDTO.orderStatus;
      order.user_id = updateOrderDTO.user_id;
      order.employee_id = updateOrderDTO.employee_id;
      order.location_id = updateOrderDTO.location_id;

      // Cập nhật danh sách sản phẩm trong Order_productEntity
      for (const productDto of updateOrderDTO.products) {
        const product = order.orderProducts.find(
            (prod) => prod.product_id === productDto.product_id,
        );

        if (product) {
          // Nếu sản phẩm đã tồn tại, cập nhật thông tin
          product.quantity = productDto.quantity;
          product.priceout = productDto.priceout;
        } else {
          // Nếu sản phẩm không tồn tại, thêm mới
          const newProduct = new Order_productEntity();
          newProduct.product_id = productDto.product_id;
          newProduct.quantity = productDto.quantity;
          newProduct.priceout = productDto.priceout;
          newProduct.order = order; // Gán liên kết với order

          order.orderProducts.push(newProduct); // Thêm vào danh sách sản phẩm
        }
      }

      // Lưu thay đổi vào cơ sở dữ liệu
      return await this.orderRepo.save(order);
    }
    catch (e) {
      // Rollback transaction on error
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(
          'ORDER.OCCUR ERROR WHEN UPDATE TO DATABASE!',
      );
    } finally {
      await queryRunner.release();
    }
  }
}
