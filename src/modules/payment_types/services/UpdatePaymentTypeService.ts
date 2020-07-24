import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import PaymentType from '../infra/typeorm/entities/PaymentType';
import IPaymentTypesRepository from '../repositories/IPaymentTypesRepository';

interface IRequest {
  id: number;
  name?: string;
  description?: string;
}

@injectable()
class UpdatePaymentTypeService {
  constructor(
    @inject('PaymentTypeRepository')
    private paymentTypeRepository: IPaymentTypesRepository,
  ) {}

  public async execute(data: IRequest): Promise<PaymentType> {
    const paymentType = await this.paymentTypeRepository.findById(data.id);

    if (!paymentType)
      throw new AppError('Could not find the payment type with this id');

    if (data.name) {
      const nameIsNotAvaiable = await this.paymentTypeRepository.findByName(
        data.name,
      );

      if (nameIsNotAvaiable) throw new AppError('This name is already in use');

      paymentType.name = data.name;
    }

    if (data.description) paymentType.description = data.description;

    return this.paymentTypeRepository.save(paymentType);
  }
}

export default UpdatePaymentTypeService;
