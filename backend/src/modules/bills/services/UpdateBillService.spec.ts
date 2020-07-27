import AppError from '@shared/errors/AppError';

import FakeBillsRepository from '../repositories/fakes/FakeBillsRepository';
import UpdateBillService from './UpdateBillService';

let fakeBillsRepository: FakeBillsRepository;

let updateBillService: UpdateBillService;

describe('UpdateBill', () => {
  beforeEach(() => {
    fakeBillsRepository = new FakeBillsRepository();

    updateBillService = new UpdateBillService(fakeBillsRepository);
  });

  it('should be able to update the bill name using the ID', async () => {
    const bill = await fakeBillsRepository.create({
      name: 'Bill Name Example',
      description: 'Bill Description Example',
      due_at: new Date(),
      projected_cost: 100.0,
    });

    await updateBillService.execute({
      id: bill.id,
      name: 'Bill Name Example 2',
    });

    const response = await fakeBillsRepository.findById(bill.id);

    expect(!!response && response.name).toBe('Bill Name Example 2');
  });

  it('should be able to update the bill description using the ID', async () => {
    const bill = await fakeBillsRepository.create({
      name: 'Bill Name Example',
      description: 'Bill Description Example',
      due_at: new Date(),
      projected_cost: 100.0,
    });

    await updateBillService.execute({
      id: bill.id,
      description: 'Bill Description Example 2',
    });

    const response = await fakeBillsRepository.findById(bill.id);

    expect(!!response && response.description).toBe(
      'Bill Description Example 2',
    );
  });

  it('should be able to update the bill due_at using the ID', async () => {
    const bill = await fakeBillsRepository.create({
      name: 'Bill Name Example',
      description: 'Bill Description Example',
      due_at: new Date(),
      projected_cost: 100.0,
    });

    await updateBillService.execute({
      id: bill.id,
      due_at: new Date('10/10/2010'),
    });

    const response = await fakeBillsRepository.findById(bill.id);

    expect(!!response && response.due_at).toStrictEqual(new Date('10/10/2010'));
  });

  it('should be able to update the bill projected cost using the ID', async () => {
    const bill = await fakeBillsRepository.create({
      name: 'Bill Name Example',
      description: 'Bill Description Example',
      due_at: new Date(),
      projected_cost: 100.0,
    });

    await updateBillService.execute({
      id: bill.id,
      projected_cost: 20.0,
    });

    const response = await fakeBillsRepository.findById(bill.id);

    expect(!!response && response.projected_cost).toBe(20.0);
  });

  it('should return error when trying to update with unused ID', async () => {
    await expect(
      updateBillService.execute({
        id: 1,
        name: 'Bill Name Example',
        description: 'Bill Description Example',
        projected_cost: 100,
        due_at: new Date(),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should return error when trying to update with name already in use', async () => {
    await fakeBillsRepository.create({
      name: 'Bill Name Example',
      description: 'Bill Description Example',
      due_at: new Date(),
      projected_cost: 100.0,
    });

    await fakeBillsRepository.create({
      name: 'Bill Name Example 2',
      description: 'Bill Description Example 2',
      due_at: new Date(),
      projected_cost: 120.0,
    });

    const bill = await fakeBillsRepository.findByName('Bill Name Example');

    if (!bill) return fail('Bill could not be created for test');

    await expect(
      updateBillService.execute({
        id: bill.id,
        name: 'Bill Name Example 2',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
