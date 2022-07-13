// ** API Route /api/auth
import { Router } from 'express';
import { authController } from '../controllers';
import { authValidator } from '../middlewares';

const router = Router();

router.post('/', authValidator.validateSignIn, authController.signIn);
router.post('/signup', authValidator.validateSignUp, authController.signUp);
router.get('/renew', authValidator.validateJWT, authController.renewToken);

export default router;
