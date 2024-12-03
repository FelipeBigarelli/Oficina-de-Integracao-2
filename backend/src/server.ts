import 'reflect-metadata';
import cors from 'cors';
import express from 'express';

import createConnection from './database';
import { router } from './routes';

import './container';

const app = express();
const port = 3333;

createConnection()
  .then(() => {
    console.log('Database connected successfully!');

    app.use(express.json());
    app.use(cors());
    app.use(router);

    app.listen(port, () => {
      console.log(`Server is running on port ${port}...`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to the database:', error);
  });
