import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import IPaymentsRepository from '../repositories/IPaymentsRepository';
import Payment from '../infra/typeorm/entities/Payment';

interface IRequest {
  name: string;
  description?: string;
  payment_type_id: number;
  bill_id?: number;
  value: number;
  paid_at: Date;
}

@injectable()
class CreatePaymentService {
  constructor(
    @inject('PaymentsRepository')
    private paymentsRepository: IPaymentsRepository,
  ) {}

  public async execute(data: IRequest): Promise<Payment> {
    const payment = await this.paymentsRepository.create(data);

    return payment;
  }
}

export default CreatePaymentService;
