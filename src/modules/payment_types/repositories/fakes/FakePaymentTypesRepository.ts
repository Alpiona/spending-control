import ICreatePaymentTypeDTO from '@modules/payment_types/dtos/ICreatePaymentTypeDTO';
import IPaymentTypeRepository from '../IPaymentTypeRepository';

import PaymentType from '../../infra/typeorm/entities/PaymentType';

class FakePaymentTypeRepository implements IPaymentTypeRepository {
  private paymentTypes: PaymentType[] = [];

  public async create(data: ICreatePaymentTypeDTO): Promise<PaymentType> {
    const paymentType = new PaymentType();

    Object.assign(paymentType, { id: this.paymentTypes.length + 1 }, data);

    this.paymentTypes.push(paymentType);

    return paymentType;
  }

  public async findById(id: number): Promise<PaymentType | undefined> {
    const paymentType = this.paymentTypes.find(pt => pt.id === id);
    return paymentType;
  }

  public async findByName(name: string): Promise<PaymentType | undefined> {
    const paymentType = this.paymentTypes.find(pt => pt.name === name);
    return paymentType;
  }

  public async save(paymentType: PaymentType): Promise<PaymentType> {
    const findIndex = this.paymentTypes.findIndex(
      pt => pt.id === paymentType.id,
    );

    this.paymentTypes[findIndex] = paymentType;

    return paymentType;
  }
}

export default FakePaymentTypeRepository;
