import AppError from '../../../shared/errors/AppError';

import FakePaymentTypesRepository from '../repositories/fakes/FakePaymentTypesRepository';
import CreatePaymentTypeService from './CreatePaymentTypeService';

let fakePaymentTypesRepository: FakePaymentTypesRepository;
let createPaymentType: CreatePaymentTypeService;

describe('CreatePaymentType', () => {
  beforeEach(() => {
    fakePaymentTypesRepository = new FakePaymentTypesRepository();

    createPaymentType = new CreatePaymentTypeService(
      fakePaymentTypesRepository,
    );
  });

  it('should be able to create new type of payment', async () => {
    const paymentType = await createPaymentType.execute({
      name: 'Payment Name Example',
      description: 'Payment Description Example',
    });

    expect(paymentType).toHaveProperty('id');
  });

  it('should not be able to create new type of payment with same name', async () => {
    await createPaymentType.execute({
      name: 'Payment Name Example',
      description: 'Payment Description Example',
    });

    await expect(
      createPaymentType.execute({
        name: 'Payment Name Example',
        description: 'Payment Description Example',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
