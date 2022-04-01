import { Satelite } from 'src/interfaces/satelite';
import { Vector } from '../interfaces/vector';

function sqr(a: number): number {
  return a ** 2;
}

export function calculatePosition(satellites: Satelite[]): Vector | undefined {
  if (!Array.isArray(satellites)) return undefined;
  if (satellites.length < 3) return undefined;

  const [s1, s2, s3] = satellites;

  if (s1 === undefined || s2 === undefined || s3 === undefined) return undefined;
  if (s1.position === undefined || s2.position === undefined || s3.position === undefined) return undefined;
  if (!s1.distance || !s2.distance || !s3.distance) return undefined;

  let j;
  let k;
  let x;
  let y: number;

  k = (sqr(s1.position.x) + sqr(s1.position.y) - sqr(s2.position.x) - sqr(s2.position.y) - sqr(s1.distance) + sqr(s2.distance)) /
    (2 * (s1.position.y - s2.position.y)) - (sqr(s1.position.x) + sqr(s1.position.y) - sqr(s3.position.x) - sqr(s3.position.y) - sqr(s1.distance) + sqr(s3.distance)) /
    (2 * (s1.position.y - s3.position.y));

  j = (s3.position.x - s1.position.x) /
    (s1.position.y - s3.position.y) - (s2.position.x - s1.position.x) /
    (s1.position.y - s2.position.y);

  x = k / j;

  y = ((s2.position.x - s1.position.x) / (s1.position.y - s2.position.y))
    * x + (sqr(s1.position.x) + sqr(s1.position.y) - sqr(s2.position.x) - sqr(s2.position.y) - sqr(s1.distance) + sqr(s2.distance)) /
    (2 * (s1.position.y - s2.position.y));

  return { x, y };
}
