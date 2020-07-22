import PaymentType from '../infra/typeorm/entities/PaymentType';
import ICreatePaymentTypeDTO from '../dtos/ICreatePaymentTypeDTO';

export default interface IPaymentTypeRepository {
  create(data: ICreatePaymentTypeDTO): Promise<PaymentType>;
  findById(id: number): Promise<PaymentType | undefined>;
  findByName(name: string): Promise<PaymentType | undefined>;
  save(paymentType: PaymentType): Promise<PaymentType>;
}
