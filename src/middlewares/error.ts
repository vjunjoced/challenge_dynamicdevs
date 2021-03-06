import { NextFunction, Request, Response } from 'express';

/**
 * Manejador de errores
 * @param err 
 * @param _req 
 * @param res 
 * @param _next 
 */
export function middlewareError(err: any, _req: Request, res: Response, _next: NextFunction) {
  if (err.statusCode) {
    res.status(err.statusCode).json({
      error: err.message,
      code: err.code,
    });
  } else {
    res.status(500).json({ error: err.message })
  }
}