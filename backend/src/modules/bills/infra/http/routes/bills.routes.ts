import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import BillsController from '../controllers/BillsController';

const billsRouter = Router();
const billsController = new BillsController();

billsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      due_at: Joi.number().required(),
      name: Joi.string().required(),
      description: Joi.string(),
      projected_cost: Joi.number(),
    },
  }),
  billsController.create,
);

billsRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      id: Joi.number().required(),
      name: Joi.string(),
      description: Joi.string(),
      projected_cost: Joi.number(),
    },
  }),
  billsController.update,
);

export default billsRouter;
