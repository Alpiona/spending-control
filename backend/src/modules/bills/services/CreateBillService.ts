import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import IBillsRepository from '../repositories/IBillsRepository';
import Bill from '../infra/typeorm/entities/Bill';

interface IRequest {
  name: string;
  description?: string;
  projected_cost?: number;
  due_at: Date;
}

@injectable()
class CreateBillService {
  constructor(
    @inject('BillsRepository')
    private billsRepository: IBillsRepository,
  ) {}

  public async execute(data: IRequest): Promise<Bill> {
    let bill = await this.billsRepository.findByName(data.name);

    if (bill) throw new AppError('Name choosed already in use');

    bill = await this.billsRepository.create(data);

    return bill;
  }
}

export default CreateBillService;
