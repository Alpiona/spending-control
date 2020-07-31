import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateBillService from '@modules/bills/services/CreateBillService';
import UpdateBillService from '@modules/bills/services/UpdateBillService';

export default class BillsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { due_at, name, description, projected_cost } = request.body;

    const createBill = container.resolve(CreateBillService);

    const bill = await createBill.execute({
      due_at,
      name,
      description,
      projected_cost,
    });

    return response.json(bill);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id, description, due_at, name, projected_cost } = request.body;

    const updateBill = container.resolve(UpdateBillService);

    const bill = await updateBill.execute({
      id,
      description,
      due_at,
      name,
      projected_cost,
    });

    return response.json(bill);
  }
}
