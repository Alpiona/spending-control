import { Repository, getRepository } from 'typeorm';

import IBillsRepository from '@modules/bills/repositories/IBillsRepository';
import ICreateBillDTO from '@modules/bills/dtos/ICreateBillDTO';
import Bill from '../entities/Bill';

class BillsRepository implements IBillsRepository {
  private ormRepository: Repository<Bill>;

  constructor() {
    this.ormRepository = getRepository(Bill);
  }

  public async create(data: ICreateBillDTO): Promise<Bill> {
    const bill = this.ormRepository.create(data);

    await this.ormRepository.save(bill);

    return bill;
  }

  public async findByName(name: string): Promise<Bill | undefined> {
    const bill = await this.ormRepository.findOne({ name });

    return bill;
  }

  public async findById(id: number): Promise<Bill | undefined> {
    const paymentType = await this.ormRepository.findOne(id);

    return paymentType;
  }

  public async save(bill: Bill): Promise<Bill> {
    return this.ormRepository.save(bill);
  }
}

export default BillsRepository;
