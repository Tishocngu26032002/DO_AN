import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { ImportEntity } from 'src/entities/import_entity/import.entity';
import { Import_productEntity } from 'src/entities/import_entity/import_product.entity';
import { CreateImportDto } from 'src/dto/importDTO/import.create.dto';
import { UpdateImpotyDTO } from 'src/dto/importDTO/import.update.dto';
import { Order_productEntity } from 'src/entities/order_entity/order_product.entity';

@Injectable()
export class ImportService {
  constructor(
    @InjectRepository(ImportEntity)
    private readonly importRepo: Repository<ImportEntity>,
    @InjectRepository(Import_productEntity)
    private readonly importProductRepo: Repository<Import_productEntity>,
    private readonly dataSource: DataSource,
  ) {}
  async create(createImportDto: CreateImportDto) {
    // Start transaction
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const importProduct = this.importRepo.create({
        employee_id: createImportDto.user_id,
        total_amount: createImportDto.totalAmount,
      });

      const importData = await queryRunner.manager.save(importProduct);

      const import_products = createImportDto.products.map((item) => {
        return this.importProductRepo.create({
          quantity: item.quantity,
          price_in: item.pricein,
          product_id: item.product_id,
          import_id: importData.id,
        });
      });

      await queryRunner.manager.save(import_products);

      // Commit transaction
      await queryRunner.commitTransaction();

      return importData;
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

  findAll() {
    return `This action returns all import`;
  }

  findOne(id: number) {
    return `This action returns a #${id} import`;
  }

  async update(updateImportDto: UpdateImpotyDTO) {
    const import_ = await this.importRepo.findOne({
      where: { id: updateImportDto.import_id },
      relations: ['Import_productEntity'],
    });

    if (!import_) {
      throw new Error('ORDER.ORDER UPDATE NOT FOUND!');
    }

    import_.total_amount = updateImportDto.totalAmount;
    import_.employee_id = updateImportDto.user_id;

    // Cập nhật danh sách sản phẩm trong Order_productEntity
    for (const productDto of updateImportDto.products) {
      const product = import_.importProducts.find(
        (prod) => prod.product_id === productDto.product_id,
      );

      if (product) {
        // Nếu sản phẩm đã tồn tại, cập nhật thông tin
        product.quantity = productDto.quantity;
        product.price_in = productDto.pricein;
      } else {
        // Nếu sản phẩm không tồn tại, thêm mới
        const newProduct = new Import_productEntity();
        newProduct.product_id = productDto.product_id;
        newProduct.quantity = productDto.quantity;
        newProduct.price_in = productDto.pricein;
        newProduct.import = import_; // Gán liên kết với order

        import_.importProducts.push(newProduct); // Thêm vào danh sách sản phẩm
      }
    }

    // Lưu thay đổi vào cơ sở dữ liệu
    return await this.importRepo.save(import_);
  }

  remove(id: number) {
    return `This action removes a #${id} import`;
  }
}
