import { Satelite } from '../interfaces/satelite';

/**
 * Se guardar la informacion de los satelites
 */
export class DataSatellites {
  private kenobi: Satelite = {
    name: 'kenobi',
    position: {
      x: -500,
      y: -200
    }
  }
  private skywalker: Satelite = {
    name: 'skywalker',
    position: {
      x: 100,
      y: -100
    }
  }
  private sato: Satelite = {
    name: 'sato',
    position: {
      x: 500,
      y: 100
    }
  }
  private satellites: Satelite[];

  constructor() {
    this.satellites = [this.kenobi, this.skywalker,this.sato]
  }

  static instance: DataSatellites;

  public static getInstance(): DataSatellites {
    if (!DataSatellites.instance) {
      DataSatellites.instance = new DataSatellites();
    }
    return DataSatellites.instance;
  }

  /**
   * 
   * @param name Obtener un satelite por nombre
   * @returns 
   */
  public getSatelite(name: string): Satelite | undefined {
    return this.satellites.find(s => s.name === name);
  }

  /**
   * Obtener todos los satelites
   */
  public getSatellites(): Satelite[] {
    return this.satellites;
  }
}
