import { Router } from 'express';
import rootController from '@controllers/rootController';
import platesRoutes from './plates';
import ingredientsRouter from './ingredients';
import categoriesRouter from './categories';

const rootRouter = Router();

function wrapRouter(router: Router) {
  router.get('/', rootController);
  router.use('/plates', platesRoutes);
  router.use('/ingredients', ingredientsRouter);
  router.use('/categories', categoriesRouter);
}

wrapRouter(rootRouter);

export default rootRouter;
