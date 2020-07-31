import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import PaymentTypesController from '../controllers/PaymentTypesController';

const paymentTypesRouter = Router();
const paymentTypesController = new PaymentTypesController();

paymentTypesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string(),
    },
  }),
  paymentTypesController.create,
);

export default paymentTypesRouter;
