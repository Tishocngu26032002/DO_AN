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
    const existingRecord = await this.repository.findOne({
      where: findCondition,
    });
    if (existingRecord) {
      throw new Error('RECORD ALREADY EXISTS!');
    }
    //Object.assign(existingRecord, data);
    const newRecord = this.repository.create(data);
    return await this.repository.save(newRecord);
  }

  async findOne(id: number): Promise<T> {
    return await this.repository.findOneBy({ id } as any);
  }

  async update(data: Partial<T>, id: number): Promise<T> {
    const existingRecord = await this.repository.findOneBy({ id } as any);
    if (!existingRecord) {
      throw new Error('RECORD NOT FOUND!');
    }
    Object.assign(existingRecord, data);
    return await this.repository.save(existingRecord);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
