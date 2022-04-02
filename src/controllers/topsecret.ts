import { Response, Request, NextFunction } from 'express';
import { TopSecretPostDto } from '../interfaces/topSecretPost.dto';
import { ResultTopSecret } from '../interfaces/resultTopSecret';
import { TopsecretService } from '../services/topsecret';
import { ValidationError } from '../class/errorValidation';

/**
 * Controlador para el módulo de TopSecret
 */
export class TopsecretController {

  /**
   * Función controlador que se encarga de recibir la solicitud, validar los datos y obtener la respuesta
   * @param req Request de la solicitud
   * @param res Response de la solicitud
   * @param next 
   */
  static topSecret(req: Request, res: Response, next: NextFunction) {
    try {
      const body: TopSecretPostDto = req.body;
      // validate body
      if (!body.satellites) throw new ValidationError('satellites is required');
      if (!Array.isArray(body.satellites)) throw new ValidationError('satellites must be an array');

      const result: ResultTopSecret = TopsecretService.getTopSecret(body);
      
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
}
