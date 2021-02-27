import {Router} from 'express';
import * as AuthControl from '../controllers/auth';
import {checkDuplicateUsernameOrEmail, checkRolesExisted} from '../middlewares/auth';

const router = Router();

router.post('/api/auth/register', [checkDuplicateUsernameOrEmail, checkRolesExisted], AuthControl.register)
router.post('/api/auth/login', AuthControl.login)

export default router;
