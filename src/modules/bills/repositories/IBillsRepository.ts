import Bill from '../infra/typeorm/entities/Bill';
import ICreateBillDTO from '../dtos/ICreateBillDTO';

export default interface IBillsRepository {
  create(data: ICreateBillDTO): Promise<Bill>;
  findByName(name: string): Promise<Bill | undefined>;
  findById(id: number): Promise<Bill | undefined>;
  save(bill: Bill): Promise<Bill>;
}
