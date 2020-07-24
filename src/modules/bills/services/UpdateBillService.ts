import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import IBillsRepository from '../repositories/IBillsRepository';
import Bill from '../infra/typeorm/entities/Bill';

interface IRequest {
  id: number;
  name?: string;
  description?: string;
  projected_cost?: number;
  due_at?: Date;
}

@injectable()
class UpdateBillService {
  constructor(
    @inject('BillsRepository')
    private billsRepository: IBillsRepository,
  ) {}

  public async execute(data: IRequest): Promise<Bill> {
    let bill = await this.billsRepository.findById(data.id);

    if (!bill) throw new AppError('Could not find a bill with this ID');

    if (data.name) {
      const nameNotAvaiable = await this.billsRepository.findByName(data.name);

      if (nameNotAvaiable) throw new AppError('The new name is already in use');

      bill.name = data.name;
    }
    if (data.description) bill.description = data.description;
    if (data.projected_cost) bill.projected_cost = data.projected_cost;
    if (data.due_at) bill.due_at = data.due_at;

    bill = await this.billsRepository.save(bill);

    return bill;
  }
}

export default UpdateBillService;
