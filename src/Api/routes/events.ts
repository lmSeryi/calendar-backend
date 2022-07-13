// ** API Route /api/auth
import { Router } from 'express';
import { authValidator, eventsValidator } from '../middlewares';
import { eventsController } from '../controllers';

const router = Router();

router.get('/', authValidator.validateJWT, eventsController.getEvents);
router.get('/:id', authValidator.validateJWT, eventsController.getEvent);
router.post('/', authValidator.validateJWT, eventsValidator.validateEvent, eventsController.createEvent);
router.put('/:id', authValidator.validateJWT, eventsController.updateEvent);
router.delete('/:id', authValidator.validateJWT, eventsController.deleteEvent);

export default router;
