/**
 * Rutas para el modulo de TopSecret
 */
import { Router } from 'express';
import { TopsecretSplitController } from '../controllers/topSecretSplit';


const router = Router();

router.route('/').get([], TopsecretSplitController.getResult);
router.route('/:satellite_name').post([], TopsecretSplitController.postSplit);

export default router;
