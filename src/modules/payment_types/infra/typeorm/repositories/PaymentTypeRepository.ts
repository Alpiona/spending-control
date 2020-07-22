import { Repository, getRepository } from 'typeorm';

import IPaymentTypeRepository from '@modules/payment_types/repositories/IPaymentTypeRepository';
import ICreatePaymentTypeDTO from '@modules/payment_types/dtos/ICreatePaymentTypeDTO';
import PaymentType from '../entities/PaymentType';

class PaymentTypeRepository implements IPaymentTypeRepository {
  private ormRepository: Repository<PaymentType>;

  constructor() {
    this.ormRepository = getRepository(PaymentType);
  }

  public async create(data: ICreatePaymentTypeDTO): Promise<PaymentType> {
    const paymentType = this.ormRepository.create(data);

    await this.ormRepository.save(paymentType);

    return paymentType;
  }

  public async findByName(name: string): Promise<PaymentType | undefined> {
    const paymentType = await this.ormRepository.findOne({ name });

    return paymentType;
  }
}

export default PaymentTypeRepository;
