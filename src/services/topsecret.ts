import { ResultTopSecret } from "src/interfaces/resultTopSecret";
import { TopSecretPostDto } from "src/interfaces/topSecretPost.dto";
import { DataSatellites } from './satellites';
import { Satelite } from '../interfaces/satelite';
import { calculatePosition } from "src/libs/trilateration";
import { getMessage } from '../libs/calculateMessage';
import { NotFoundError } from '../class/errorNotFound';
import { Vector } from '../interfaces/vector';

export class TopsecretService {

  public static getTopSecret(data: TopSecretPostDto): ResultTopSecret {
    const satellites: Satelite[] = [];
    const messages: Record<any, string[]> = {
      kenobi: [],
      skywalker: [],
      sato: []
    }

    data.satellites.forEach(s => {
      const st = DataSatellites.getInstance().getSatelite(s.name);
      messages[s.name] = s.message;

      if (st) {
        satellites.push({
          ...st,
          distance: s.distance,
        });
      }
    })

    const position = calculatePosition(satellites);
    validatePosition(position);

    const message = getMessage(messages.kenobi || [], messages.skywalker || [], messages.sato || []);
    if (!message) throw new NotFoundError('No message found');

    return { position: position! , message };
  }
}

function validatePosition(position: Vector | undefined): void {
  if (!position) throw new NotFoundError('No position found');
  if (isNaN(position.x) || isNaN(position.y)) throw new NotFoundError('No position found');
}
