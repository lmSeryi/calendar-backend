// ** API Route /api
import { Router } from 'express';

import authRoutes from './auth';
import eventsRoutes from './events';

const router = Router();

router.use('/auth', authRoutes);
router.use('/events', eventsRoutes);

export default router;
