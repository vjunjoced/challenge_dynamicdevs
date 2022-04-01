import { Response, Request, NextFunction } from 'express';
import { TopSecretPostDto } from '../interfaces/topSecretPost.dto';
import { ResultTopSecret } from '../interfaces/resultTopSecret';
import { TopsecretService } from '../services/topsecret';
import { ValidationError } from '../class/errorValidation';

export class TopSecretController {
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
