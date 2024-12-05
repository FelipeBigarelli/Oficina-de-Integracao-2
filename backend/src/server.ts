/* eslint-disable @typescript-eslint/no-unused-vars */
import 'reflect-metadata';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import createConnection from './database';
import { AppError } from './errors/AppError';
import { router } from './routes';

import './container';

const app = express();
const port = 3333;

createConnection()
  .then(() => {
    console.log('Database connected');

    app.use(express.json());
    app.use(cors());
    app.use(router);

    app.use(
      (
        err: Error,
        request: Request,
        response: Response,
        next: NextFunction
      ) => {
        if (err instanceof AppError) {
          return response.status(err.statusCode).json({
            message: err.message,
          });
        }

        return response.status(500).json({
          status: 'error',
          message: `Internal server error - ${err.message}`,
        });
      }
    );

    app.listen(port, () => {
      console.log(`Server is running on port ${port}...`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to the database:', error);
  });
