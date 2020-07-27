import { Repository, getRepository } from 'typeorm';

import IPaymentsRepository from '@modules/payments/repositories/IPaymentsRepository';
import ICreatePaymentDTO from '@modules/payments/dtos/ICreatePaymentDTO';
import Payment from '../entities/Payment';

class PaymentsRepository implements IPaymentsRepository {
  private ormRepository: Repository<Payment>;

  constructor() {
    this.ormRepository = getRepository(Payment);
  }

  public async create(data: ICreatePaymentDTO): Promise<Payment> {
    const payment = this.ormRepository.create(data);

    await this.ormRepository.save(payment);

    return payment;
  }

  public async findById(id: number): Promise<Payment | undefined> {
    const payment = await this.ormRepository.findOne(id);

    return payment;
  }

  public async save(payment: Payment): Promise<Payment> {
    return this.ormRepository.save(payment);
  }
}

export default PaymentsRepository;
