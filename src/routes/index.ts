import express from 'express';
import routerToSecret from './topsecret'

export class Router {
  /**
   * Inicializar rutas
   * @param app express app
   */
  public static initializeRoutes(app: express.Express) {
    app.use('/topsecret', routerToSecret);
  }
}