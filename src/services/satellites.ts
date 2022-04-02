import { Satellite } from '../interfaces/satelite';

/**
 * Se guardar la informacion de los satelites
 */
export class DataSatellites {
  private kenobi: Satellite = {
    name: 'kenobi',
    position: {
      x: -500,
      y: -200
    }
  }
  private skywalker: Satellite = {
    name: 'skywalker',
    position: {
      x: 100,
      y: -100
    }
  }
  private sato: Satellite = {
    name: 'sato',
    position: {
      x: 500,
      y: 100
    }
  }
  private satellites: Satellite[];

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
  public getSatellite(name: string): Satellite | undefined {
    return this.satellites.find(s => s.name === name);
  }

  /**
   * Obtener todos los satelites
   */
  public getSatellites(): Satellite[] {
    return this.satellites;
  }

  /**
   * Guarda la información de la distancia y mensaje en un satélite
   * @param name Nombre del satélite
   * @param message Mensaje a guardar
   * @param distance Distancia de la nave con el satélite
   */
  public setMessageAndDistance(name: string, message: string[], distance: number): void {
    const satellite = this.getSatellite(name);
    if (satellite) {
      satellite.message = message;
      satellite.distance = distance;
    }
  }
}
