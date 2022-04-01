/**
 * Rutas para el modulo de TopSecret
 */
import { Router } from 'express';

import { TopSecretController } from '../controllers/topsecret';

const router = Router();

router.route('/').post([], TopSecretController.topSecret);

export default router;
