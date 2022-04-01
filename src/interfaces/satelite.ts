import { Vector } from './vector';

export interface Satelite {
  name: string;
  position: Vector;
  distance?: number;
}
