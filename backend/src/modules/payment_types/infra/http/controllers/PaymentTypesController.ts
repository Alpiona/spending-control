import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreatePaymentTypeService from '@modules/payment_types/services/CreatePaymentTypeService';

export default class PaymentTypesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const createPaymentType = container.resolve(CreatePaymentTypeService);

    const paymentType = await createPaymentType.execute({
      name,
      description,
    });

    return response.json(paymentType);
  }
}
