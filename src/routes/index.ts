import express from 'express';
import routerToSecret from './topsecret'

export class Router {
  public static initializeRoutes(app: express.Express) {
    app.use('/topsecret', routerToSecret);
  }
}