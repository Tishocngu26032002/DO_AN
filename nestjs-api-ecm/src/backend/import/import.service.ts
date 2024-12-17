import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { ImportEntity } from 'src/entities/import_entity/import.entity';
import { Import_productEntity } from 'src/entities/import_entity/import_product.entity';
import { CreateImportDto } from 'src/dto/importDTO/import.create.dto';
import { UpdateImpotyDTO } from 'src/dto/importDTO/import.update.dto';

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

  async findAll(page: number, limit: number) {
    const [productImports, totalImport] = await this.importRepo.findAndCount({
      relations: ['importProducts'],
      skip: (page - 1) * limit,
      take: limit,
    });
    return {
      list: productImports,
      total: totalImport,
    };
  }

  async findOne(importProd_id: string) {
    const importProd = await this.importRepo.findOne({
      where: { id: importProd_id },
      relations: ['importProducts'],
    });

    if (!importProd) {
      throw new Error('IMPORT.IMPORT DETAIL NOT EXISTS!');
    }
    return importProd;
  }

  async update(updateImportDto: UpdateImpotyDTO) {
    const importProd = await this.importRepo.findOne({
      where: { id: updateImportDto.import_id },
      relations: ['importProducts'],
    });

    if (!importProd) {
      throw new Error('ORDER.ORDER UPDATE NOT FOUND!');
    }

    importProd.total_amount = updateImportDto.totalAmount;
    importProd.employee_id = updateImportDto.user_id;

    // Cập nhật danh sách sản phẩm trong Import_productEntity
    for (const productDto of updateImportDto.products) {
      const product = importProd.importProducts.find(
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
        newProduct.import = importProd; // Gán liên kết với order

        importProd.importProducts.push(newProduct); // Thêm vào danh sách sản phẩm
      }
    }

    // Lưu thay đổi vào cơ sở dữ liệu
    return await this.importRepo.save(importProd);
  }

  remove(id: number) {
    return `This action removes a #${id} import`;
  }
}
