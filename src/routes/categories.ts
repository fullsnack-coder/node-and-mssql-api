import { Router } from 'express';
import * as categoriesController from '../controllers/categoriesController';

const categoriesRouter = Router();

categoriesRouter.route('/').get(categoriesController.getCategories);

export default categoriesRouter;
