import Payment from '../infra/typeorm/entities/Payment';
import ICreatePaymentDTO from '../dtos/ICreatePaymentDTO';

export default interface IPaymentsRepository {
  create(data: ICreatePaymentDTO): Promise<Payment>;
  findById(id: number): Promise<Payment | undefined>;
  save(payment: Payment): Promise<Payment>;
}
