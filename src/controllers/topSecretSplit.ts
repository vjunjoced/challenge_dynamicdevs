import { Response, Request, NextFunction } from 'express';
import { ValidationError } from '../class/errorValidation';
import { TopsecretSplitService } from '../services/secretSplit';
import { TopSecretSplitPostDto } from '../interfaces/topsecretSplit.dto';

/**
 * Controlador para el módulo de TopSecret Split
 */
export class TopsecretSplitController {

  /**
   * Guarda la información para un satélite - distancia - mensaje
   * @param req 
   * @param res 
   * @param next 
   */
  static async postSplit(req: Request, res: Response, next: NextFunction) {
    try {
      const body: TopSecretSplitPostDto = req.body;
      const name = req.params.satellite_name || undefined;

      validatePost(body, name);

      await TopsecretSplitService.postSecretSplit(name!, body);

      res.send({ message: 'saved data' });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Obtiene la posición y el mensaje de la nave
   * @param _req 
   * @param res 
   * @param next 
   */
  static async getResult(_req: Request, res: Response, next: NextFunction) {
    try {
      const result = await TopsecretSplitService.getSecretSplit();

      res.send(result);
    } catch (error) {
      next(error);
    }
  }
}

function validatePost(data: TopSecretSplitPostDto, name: string | undefined) {
  if (!name) throw new ValidationError('Satellite name is required');
  if (!data.distance) throw new ValidationError('distance is required');
  if (!data.message) throw new ValidationError("message is required");
  if (!Array.isArray(data.message)) throw new ValidationError('message must be an array');
}