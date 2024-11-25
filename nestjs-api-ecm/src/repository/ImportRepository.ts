import { EntityRepository, Repository } from 'typeorm';
import {ImportEntity} from "src/entities/import_entity/import.entity";

@EntityRepository(ImportEntity)
export class ImportRepository extends Repository<ImportEntity> {

    // Tính tổng priceIn theo khoảng thời gian
    async getTotalPriceIn(startDate: Date, endDate: Date): Promise<number> {
        const result = await this.createQueryBuilder('imports')
            .select('SUM(imports.total_amount)', 'totalPriceIn')
            .where('imports.createdAt BETWEEN :startDate AND :endDate', { startDate, endDate })
            .getRawOne();

        return result.totalPriceIn || 0;
    }
}
