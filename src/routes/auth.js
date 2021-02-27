import {Router} from 'express';
import * as AuthControl from '../controllers/auth';

const router = Router();

router.post('/api/auth/register', AuthControl.register)
router.post('/api/auth/login', AuthControl.login)

export default router;
