import FakePaymentsRepository from '../repositories/fakes/FakePaymentsRepository';
import CreatePaymentService from './CreatePaymentService';

let fakePaymentsRepository: FakePaymentsRepository;
let createPaymentService: CreatePaymentService;

describe('CreatePayment', () => {
  beforeEach(() => {
    fakePaymentsRepository = new FakePaymentsRepository();

    createPaymentService = new CreatePaymentService(fakePaymentsRepository);
  });

  it('should be able to create new payment with all the possible data', async () => {
    const payment = await createPaymentService.execute({
      name: 'Payment Name',
      description: 'Payment Description',
      paid_at: new Date(),
      payment_type_id: 1,
      value: 20.22,
      bill_id: 1,
    });

    expect(payment).toHaveProperty('id');
  });

  it('should be able toe create new payment using only the necessary data', async () => {
    const payment = await createPaymentService.execute({
      name: 'Payment Name',
      paid_at: new Date(),
      payment_type_id: 1,
      value: 20.22,
    });

    expect(payment).toHaveProperty('id');
  });
});
