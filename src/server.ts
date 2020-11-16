import express from 'express';
import cors from 'cors';

import routes from '@routes/rootRouter';
import configKeys from './config/keys';

// wrapping the server
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// routes
app.use('/', routes);

async function initializeApp() {
  const { port } = configKeys.server;
  app.listen(port, () => {
    console.log(`Server running at: http://localhost:${port}/`);
  });
}

initializeApp();
