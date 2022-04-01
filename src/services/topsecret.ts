import { ResultTopSecret } from "src/interfaces/resultTopSecret";
import { TopSecretPostDto } from "src/interfaces/topSecretPost.dto";
import { DataSatellites } from './satellites';
import { Satelite } from '../interfaces/satelite';
import { getLocation } from "src/libs/trilateration";
import { getMessage } from '../libs/calculateMessage';
import { NotFoundError } from '../class/errorNotFound';
import { Vector } from '../interfaces/vector';

export class TopsecretService {

  /**
   * Determinar el mensaje y la posición de la nave
   * @param data Body de la solicitud
   * @returns Retorna un objeto con la posición y el mensaje
   */
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

    const position = getLocation(satellites);
    validatePosition(position);

    const message = getMessage(messages.kenobi || [], messages.skywalker || [], messages.sato || []);
    if (!message) throw new NotFoundError('No message found');

    return { position: position! , message };
  }
}

/**
 * Verificar si la posición es válida
 * @param position Posición a verificar
 */
function validatePosition(position: Vector | undefined): void {
  if (!position) throw new NotFoundError('No position found');
  if (Number.isNaN(position.x) || Number.isNaN(position.y)) throw new NotFoundError('No position found');
}