import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import PaymentType from '../infra/typeorm/entities/PaymentType';
import IPaymentTypeRepository from '../repositories/IPaymentTypeRepository';

interface IRequest {
  name: string;
  description?: string;
}

@injectable()
class CreatePaymentTypeService {
  constructor(
    @inject('PaymentTypeRepository')
    private paymentTypeRepository: IPaymentTypeRepository,
  ) {}

  public async execute({ name, description }: IRequest): Promise<PaymentType> {
    let paymentType = await this.paymentTypeRepository.findByName(name);

    if (paymentType) throw new AppError('Name already used');

    paymentType = await this.paymentTypeRepository.create({
      name,
      description,
    });

    return paymentType;
  }
}

export default CreatePaymentTypeService;
