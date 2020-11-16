import ingredientsController from '@controllers/ingredientsController';
import { Router } from 'express';

const ingredientsRouter = Router();

ingredientsRouter.route('/').post(ingredientsController.getIngredientsByPlate);

export default ingredientsRouter;
