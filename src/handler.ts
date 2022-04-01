import express, { json } from 'express';
import helmet from 'helmet';
import serverlessHttp from 'serverless-http';
import { middlewareError } from './middlewares/error';
import { Router } from './routes/index';

const app = express();
app.use(json());
app.use(helmet());

app.get('/', (_, res) =>
  res.json({
    msg: 'Hello World',
  })
);

Router.initializeRoutes(app);
app.use((_req, res) => res.status(404).send('Not found'));
app.use(middlewareError);

export const handler = serverlessHttp(app);
