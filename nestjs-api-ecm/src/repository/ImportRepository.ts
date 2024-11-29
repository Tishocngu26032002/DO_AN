import {DataSource, EntityRepository, Repository} from 'typeorm';
import {ImportEntity} from "src/entities/import_entity/import.entity";

@EntityRepository(ImportEntity)
export class ImportRepository extends Repository<ImportEntity> {
    constructor(private readonly dataSource: DataSource) {
        super(ImportEntity, dataSource.manager);
    }
}
