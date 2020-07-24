import ICreatePaymentDTO from '@modules/payments/dtos/ICreatePaymentDTO';
import IPaymentsRepository from '@modules/payments/repositories/IPaymentsRepository';

import Payment from '../../infra/typeorm/entities/Payment';

class FakePaymentsRepository implements IPaymentsRepository {
  private payments: Payment[] = [];

  public async create(data: ICreatePaymentDTO): Promise<Payment> {
    const payment = new Payment();

    Object.assign(payment, { id: this.payments.length + 1 }, data);

    this.payments.push(payment);

    return payment;
  }

  public async findById(id: number): Promise<Payment | undefined> {
    const payment = this.payments.find(p => p.id === id);

    return payment;
  }

  public async save(payment: Payment): Promise<Payment> {
    const findIndex = this.payments.findIndex(p => p.id === payment.id);

    this.payments[findIndex] = payment;

    return payment;
  }
}

export default FakePaymentsRepository;
