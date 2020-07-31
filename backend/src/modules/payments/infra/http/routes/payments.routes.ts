import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import PaymentsController from '../controllers/PaymentsController';

const paymentsRouter = Router();
const paymentsController = new PaymentsController();

paymentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      paid_at: Joi.date().required(),
      payment_type_id: Joi.number().required(),
      value: Joi.number().required(),
      bill_id: Joi.number(),
      description: Joi.string(),
    },
  }),
  paymentsController.create,
);

export default paymentsRouter;
