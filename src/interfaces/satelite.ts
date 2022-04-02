import { Vector } from './vector';

export interface Satellite {
  name: string;
  position: Vector;
  distance?: number;
  message?: string[];
}
