import { container } from 'tsyringe';

import IBillsRepository from '@modules/bills/repositories/IBillsRepository';
import BillsRepository from '@modules/bills/infra/typeorm/repositories/BillsRepository';

import IPaymentsRepository from '@modules/payments/repositories/IPaymentsRepository';
import PaymentsRepository from '@modules/payments/infra/typeorm/repositories/PaymentsRepository';

import IPaymentTypesRepository from '@modules/payment_types/repositories/IPaymentTypesRepository';
import PaymentTypesRepository from '@modules/payment_types/infra/typeorm/repositories/PaymentTypesRepository';

container.registerSingleton<IBillsRepository>(
  'BillsRepository',
  BillsRepository,
);

container.registerSingleton<IPaymentsRepository>(
  'PaymentRepository',
  PaymentsRepository,
);

container.registerSingleton<IPaymentTypesRepository>(
  'PaymentTypesRepository',
  PaymentTypesRepository,
);
