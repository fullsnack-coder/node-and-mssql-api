import express from 'express';
import rootController from '@controllers/rootController';

const app = express();

app.get('/', rootController);

app.listen(3333);
