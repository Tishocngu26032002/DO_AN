import {DeepPartial, Repository} from 'typeorm';

export class BaseService<T> {
  constructor(protected readonly repository: Repository<T>) {}

  async findAll(
    limit: number = 10,
    page: number = 1,
  ): Promise<{ data: T[]; total: number }> {
    const [result, total] = await this.repository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
    });
    return {
      data: result,
      total,
    };
  }

  async create(data: DeepPartial<T>, findCondition: any): Promise<T> {
    const queryRunner = this.repository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const existingRecord = await this.repository.findOne({
        where: findCondition,
      });
      if (existingRecord) {
        throw new Error('RECORD ALREADY EXISTS!');
      }
      const newRecord = this.repository.create(data);
      const savedRecord = await queryRunner.manager.save(newRecord);
      await queryRunner.commitTransaction();
      return savedRecord;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findOne(id: string): Promise<T> {
    return await this.repository.findOneBy({ id } as any);
  }

  async update(data: Partial<T>, id: string): Promise<T> {
    const queryRunner = this.repository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const existingRecord = await this.repository.findOneBy({ id } as any);
      if (!existingRecord) {
        throw new Error('RECORD NOT FOUND!');
      }
      Object.assign(existingRecord, data);
      const updatedRecord = await queryRunner.manager.save(existingRecord);
      await queryRunner.commitTransaction();
      return updatedRecord;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async delete(id: string): Promise<void> {
    const queryRunner = this.repository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const existingRecord = await queryRunner.manager.findOne(this.repository.target, {
        where: { id } as any,
      });
      if (!existingRecord) {
        throw new Error('RECORD NOT FOUND!');
      }
      await queryRunner.manager.delete(this.repository.target, id);
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
