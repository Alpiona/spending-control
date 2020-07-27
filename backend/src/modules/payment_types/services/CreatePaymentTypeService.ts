import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import PaymentType from '../infra/typeorm/entities/PaymentType';
import IPaymentTypesRepository from '../repositories/IPaymentTypesRepository';

interface IRequest {
  name: string;
  description?: string;
}

@injectable()
class CreatePaymentTypeService {
  constructor(
    @inject('PaymentTypeRepository')
    private paymentTypeRepository: IPaymentTypesRepository,
  ) {}

  public async execute(data: IRequest): Promise<PaymentType> {
    let paymentType = await this.paymentTypeRepository.findByName(data.name);

    if (paymentType) throw new AppError('Name already used');

    paymentType = await this.paymentTypeRepository.create(data);

    return paymentType;
  }
}

export default CreatePaymentTypeService;
