import { NextFunction, Request, Response } from 'express';

export function middlewareError(err: any, _req: Request, res: Response, _next: NextFunction) {
  console.log("ERROROROROR");
  
  // report error to logging service
  console.error("mid error")

  if (err.statusCode) {
    res.status(err.statusCode).json({
      error: err.message,
      code: err.code,
    });
  } else {
    res.status(500).json({ error: err.message })
  }
}