/**
 * Rutas para el modulo de TopSecret
 */
import { Router } from 'express';

import { TopsecretController } from '../controllers/topsecret';

const router = Router();

router.route('/').post([], TopsecretController.topSecret);

export default router;
