import AppError from '@shared/errors/AppError';

import FakePaymentTypesRepository from '../repositories/fakes/FakePaymentTypesRepository';
import UpdatePaymentTypeService from './UpdatePaymentTypeService';

let fakePaymentTypesRepository: FakePaymentTypesRepository;
let updatePaymentTypeService: UpdatePaymentTypeService;

describe('UpdatePaymentType', () => {
  beforeEach(() => {
    fakePaymentTypesRepository = new FakePaymentTypesRepository();

    updatePaymentTypeService = new UpdatePaymentTypeService(
      fakePaymentTypesRepository,
    );
  });

  it('should be able to update a payment type name using the id', async () => {
    const paymentType = await fakePaymentTypesRepository.create({
      name: 'Payment Type Name',
      description: 'Payment Type Description',
    });

    await updatePaymentTypeService.execute({
      id: paymentType.id,
      name: 'Payment Type Name 2',
    });

    const response = await fakePaymentTypesRepository.findById(paymentType.id);

    expect(!!response && response.name).toBe(paymentType.name);
  });

  it('should be able to update a payment type description using the id', async () => {
    const paymentType = await fakePaymentTypesRepository.create({
      name: 'Payment Type Name',
      description: 'Payment Type Description',
    });

    await updatePaymentTypeService.execute({
      id: paymentType.id,
      description: 'Payment Type Description 2',
    });

    const response = await fakePaymentTypesRepository.findById(paymentType.id);

    expect(!!response && response.description).toBe(paymentType.description);
  });

  it('should return error when using an id that does not exist', async () => {
    await expect(
      updatePaymentTypeService.execute({
        id: 1,
        name: 'Payment Type Name',
        description: 'Payment Type Description',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should return error when trying to update to a name already in use', async () => {
    await fakePaymentTypesRepository.create({
      name: 'Payment Type Name',
      description: 'Payment Type Description',
    });

    await fakePaymentTypesRepository.create({
      name: 'Payment Type Name 2',
      description: 'Payment Type Description 2',
    });

    await expect(
      updatePaymentTypeService.execute({
        id: 1,
        name: 'Payment Type Name 2',
        description: 'Payment Type Description',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
