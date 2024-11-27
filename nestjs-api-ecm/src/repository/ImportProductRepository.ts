import {DataSource, EntityRepository, Repository} from 'typeorm';
import {Import_productEntity} from "src/entities/import_entity/import_product.entity";

@EntityRepository(Import_productEntity)
export class ImportProductRepository extends Repository<Import_productEntity> {
    constructor(private readonly dataSource: DataSource) {
        super(Import_productEntity, dataSource.manager);
    }
    async getLatestProduct(): Promise<any[]> {
        const result = await this.createQueryBuilder('import_product')
            .select('product.id', 'productId')
            .addSelect('product.name', 'productName')
            .addSelect('product.priceout', 'priceOut')
            .addSelect('import.createdAt', 'createdAt')
            .innerJoin('import_product.import', 'import') // Join bảng Import
            .innerJoin('import_product.product', 'product') // Join bảng Product
            .where('product.stockQuantity IS NOT NULL AND product.stockQuantity > 0')
            .orderBy('import.createdAt', 'DESC') // Sắp xếp theo createdAt giảm dần
            .limit(8)
            .getRawMany();

        return result.map(row => ({
            productId: row.productId,
            productName: row.productName,
            priceOut: parseFloat(row.priceOut), // Chuyển đổi priceOut sang số thực
            createdAt: row.createdAt, // Giữ nguyên ngày tạo
        }));
    }

}
