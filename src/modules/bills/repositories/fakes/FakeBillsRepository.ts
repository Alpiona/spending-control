import ICreateBillDTO from '@modules/bills/dtos/ICreateBillDTO';
import IBillsRepository from '@modules/bills/repositories/IBillsRepository';

import Bill from '../../infra/typeorm/entities/Bill';

class FakeBillsRepository implements IBillsRepository {
  private bills: Bill[] = [];

  public async create(data: ICreateBillDTO): Promise<Bill> {
    const bill = new Bill();

    Object.assign(bill, { id: this.bills.length + 1 }, data);

    this.bills.push(bill);

    return bill;
  }

  public async findByName(name: string): Promise<Bill | undefined> {
    const bill = this.bills.find(b => b.name === name);

    return bill;
  }

  public async findById(id: number): Promise<Bill | undefined> {
    const bill = this.bills.find(b => b.id === id);

    return bill;
  }

  public async save(bill: Bill): Promise<Bill> {
    const findIndex = this.bills.findIndex(b => b.id === bill.id);

    this.bills[findIndex] = bill;

    return bill;
  }
}

export default FakeBillsRepository;
