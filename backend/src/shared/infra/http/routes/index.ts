import { Router } from 'express';
import billsRouter from '@modules/bills/infra/http/routes/bills.routes';
import paymentsRouter from '@modules/payments/infra/http/routes/payments.routes';
import paymentsTypesRouter from '@modules/payment_types/infra/http/routes/payment_types.routes';

const routes = Router();

routes.use('/bills', billsRouter);
routes.use('/payments', paymentsRouter);
routes.use('/paymenttypes', paymentsTypesRouter);

export default routes;
