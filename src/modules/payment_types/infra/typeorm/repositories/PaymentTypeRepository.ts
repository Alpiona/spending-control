import { Repository, getRepository } from 'typeorm';

import IPaymentTypesRepository from '@modules/payment_types/repositories/IPaymentTypesRepository';
import ICreatePaymentTypeDTO from '@modules/payment_types/dtos/ICreatePaymentTypeDTO';
import PaymentType from '../entities/PaymentType';

class PaymentTypesRepository implements IPaymentTypesRepository {
  private ormRepository: Repository<PaymentType>;

  constructor() {
    this.ormRepository = getRepository(PaymentType);
  }

  public async create(data: ICreatePaymentTypeDTO): Promise<PaymentType> {
    const paymentType = this.ormRepository.create(data);

    await this.ormRepository.save(paymentType);

    return paymentType;
  }

  public async findById(id: number): Promise<PaymentType | undefined> {
    const paymentType = await this.ormRepository.findOne(id);

    return paymentType;
  }

  public async findByName(name: string): Promise<PaymentType | undefined> {
    const paymentType = await this.ormRepository.findOne({ name });

    return paymentType;
  }

  public async save(paymentType: PaymentType): Promise<PaymentType> {
    return this.ormRepository.save(paymentType);
  }
}

export default PaymentTypesRepository;
