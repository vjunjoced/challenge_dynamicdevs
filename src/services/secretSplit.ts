import { ResultTopSecret } from "src/interfaces/resultTopSecret";
import { DataSatellites } from './satellites';
import { Satellite } from '../interfaces/satelite';
import { getLocation } from "src/libs/trilateration";
import { getMessage } from '../libs/calculateMessage';
import { NotFoundError } from '../class/errorNotFound';
import { validatePosition } from '../utils/validatePosition';
import { TopSecretSplitPostDto } from '../interfaces/topsecretSplit.dto';
import { DataBase } from '../db/index';

export class TopsecretSplitService {

  /**
   * Determinar el mensaje y la posición de la nave
   * @returns Retorna un objeto con la posición y el mensaje
   */
  public static async getSecretSplit(): Promise<ResultTopSecret> {
    const satellites: Satellite[] = await DataBase.getSatellites();
    
    const position = getLocation(satellites);

    validatePosition(position);

    const message = getMessage(satellites[0]?.message || [], satellites[1]?.message || [], satellites[2]?.message || []);
    if (!message) throw new NotFoundError('No message found');

    return { position: position!, message };
  }

  /**
   * Guarda la información para un satélite - distancia - mensaje
   */
  public static async postSecretSplit(name: string, data: TopSecretSplitPostDto): Promise<void> {
    const { distance, message } = data;
    const dataSatellite: Satellite | undefined = DataSatellites.getInstance().getSatellite(name);

    if (!dataSatellite) throw new NotFoundError('Satellite not found');

    dataSatellite.distance = distance;
    dataSatellite.message = message; 
    await DataBase.saveSatellite(dataSatellite);
  }
}

