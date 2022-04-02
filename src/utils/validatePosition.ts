import { Vector } from '../interfaces/vector';
import { NotFoundError } from '../class/errorNotFound';

/**
 * Verificar si la posición es válida
 * @param position Posición a verificar
 */
export function validatePosition(position: Vector | undefined): void {
  if (!position) throw new NotFoundError('No position found');
  if (Number.isNaN(position.x) || Number.isNaN(position.y)) throw new NotFoundError('No position found');
}