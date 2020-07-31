import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreatePaymentService from '@modules/payments/services/CreatePaymentService';

export default class PaymentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      paid_at,
      payment_type_id,
      value,
      bill_id,
      description,
    } = request.body;

    const createPayment = container.resolve(CreatePaymentService);

    const payment = await createPayment.execute({
      name,
      paid_at,
      payment_type_id,
      value,
      bill_id,
      description,
    });

    return response.json(payment);
  }
}
