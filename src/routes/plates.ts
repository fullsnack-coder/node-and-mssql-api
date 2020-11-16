import { Router } from 'express';
import platesController from '@controllers/platesController';

const platesRoutes = Router();

platesRoutes.get('/', platesController.getAllPlates);
platesRoutes.post('/new-plate', platesController.newPlate);
platesRoutes.post('/search', platesController.getPlatesByName);

export default platesRoutes;
