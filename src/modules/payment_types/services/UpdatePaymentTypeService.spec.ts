import AppError from '@shared/errors/AppError';

import FakePaymentTypesRepository from '../repositories/fakes/FakePaymentTypesRepository';
import UpdatePaymentTypeService from './UpdatePaymentTypeService';
import PaymentType from '../infra/typeorm/entities/PaymentType';

let fakePaymentTypesRepository: FakePaymentTypesRepository;
let updatePaymentTypeService: UpdatePaymentTypeService;

describe('UpdatePaymentType', () => {
  beforeEach(() => {
    fakePaymentTypesRepository = new FakePaymentTypesRepository();

    updatePaymentTypeService = new UpdatePaymentTypeService(
      fakePaymentTypesRepository,
    );
  });

  it('should be able to update a payment type using the id', async () => {
    const paymentType = await fakePaymentTypesRepository.create({
      name: 'Payment Type Name',
      description: 'Payment Type Description',
    });

    paymentType.name = 'Payment Type Name 2';
    paymentType.description = 'Payment Type Description 2';

    await updatePaymentTypeService.execute(paymentType);

    const response = await fakePaymentTypesRepository.findById(paymentType.id);

    expect(response instanceof PaymentType && response.name).toBe(
      paymentType.name,
    );
    expect(response instanceof PaymentType && response.description).toBe(
      paymentType.description,
    );
  });

  it('should be able to return error when using an id that does not exist', async () => {
    await expect(
      updatePaymentTypeService.execute({
        id: 1,
        name: 'Payment Type Name',
        description: 'Payment Type Description',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
