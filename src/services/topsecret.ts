import { DataSatellites } from './satellites';
import { Satellite } from '../interfaces/satelite';
import { getMessage } from '../libs/calculateMessage';
import { NotFoundError } from '../class/errorNotFound';
import { TopSecretPostDto } from '../interfaces/topSecretPost.dto';
import { ResultTopSecret } from '../interfaces/resultTopSecret';
import { getLocation } from '../libs/trilateration';
import { validatePosition } from '../utils/validatePosition';

export class TopsecretService {

  /**
   * Determinar el mensaje y la posición de la nave
   * @param data Body de la solicitud
   * @returns Retorna un objeto con la posición y el mensaje
   */
  public static getTopSecret(data: TopSecretPostDto): ResultTopSecret {
    const satellites: Satellite[] = [];
    const messages: Record<any, string[]> = {
      kenobi: [],
      skywalker: [],
      sato: []
    }

    data.satellites.forEach(s => {
      const st = DataSatellites.getInstance().getSatellite(s.name);
      messages[s.name] = s.message;

      if (st) {
        satellites.push({
          ...st,
          distance: s.distance,
        });
      }
    })

    const position = getLocation(satellites);
    validatePosition(position);

    const message = getMessage(messages.kenobi || [], messages.skywalker || [], messages.sato || []);
    if (!message) throw new NotFoundError('No message found');

    return { position: position! , message };
  }
}
