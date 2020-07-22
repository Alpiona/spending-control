import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import PaymentType from '../infra/typeorm/entities/PaymentType';
import IPaymentTypeRepository from '../repositories/IPaymentTypeRepository';

interface IRequest {
  id: number;
  name: string;
  description: string;
}

@injectable()
class UpdatePaymentTypeService {
  constructor(
    @inject('PaymentTypeRepository')
    private paymentTypeRepository: IPaymentTypeRepository,
  ) {}

  public async execute({
    id,
    name,
    description,
  }: IRequest): Promise<PaymentType> {
    const paymentType = await this.paymentTypeRepository.findById(id);

    if (!paymentType)
      throw new AppError('Could not find the payment type with this id');

    paymentType.name = name;
    paymentType.description = description;

    return this.paymentTypeRepository.save(paymentType);
  }
}

export default UpdatePaymentTypeService;
