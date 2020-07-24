import AppError from '@shared/errors/AppError';

import FakeBillsRepository from '../repositories/fakes/FakeBillsRepository';
import CreateBillService from './CreateBillService';

let fakeBillsRepository: FakeBillsRepository;

let createBillService: CreateBillService;

describe('CreateBill', () => {
  beforeEach(() => {
    fakeBillsRepository = new FakeBillsRepository();

    createBillService = new CreateBillService(fakeBillsRepository);
  });

  it('should be able to create new bill', async () => {
    const bill = await createBillService.execute({
      name: 'Bill Name Example',
      description: 'Bill Description Example',
      due_at: new Date(),
      projected_cost: 100.0,
    });

    expect(bill).toHaveProperty('id');
  });

  it('should be able to create new bill with only necessary data', async () => {
    const bill = await createBillService.execute({
      name: 'Bill Name Example',
      due_at: new Date(),
    });

    expect(bill).toHaveProperty('id');
  });

  it('should not be able to create new bill with name already in use', async () => {
    await createBillService.execute({
      name: 'Bill Name Example',
      description: 'Bill Description Example',
      due_at: new Date(),
      projected_cost: 100.0,
    });

    await expect(
      createBillService.execute({
        name: 'Bill Name Example',
        description: 'Bill Description Example',
        due_at: new Date(),
        projected_cost: 100.0,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
