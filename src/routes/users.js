import {Router} from 'express';
import * as UserControl from '../controllers/users.js';
import {verifyToken, checkDuplicateUsernameOrEmail, checkRolesExisted, isAdmin, checkPasswordIsValid} from '../middlewares/auth';

const router = Router();

router.get('/api/v1/users', verifyToken, UserControl.getUser)

router.get('/api/v1/users/:id', verifyToken, UserControl.getUserById)

router.post('/api/v1/users', [verifyToken, checkDuplicateUsernameOrEmail, checkPasswordIsValid, checkRolesExisted], UserControl.createUser)

router.put('/api/v1/users/:id', [verifyToken, isAdmin] , UserControl.updateUserById)

router.delete('/api/v1/users/:id', [verifyToken, isAdmin], UserControl.deleteUserById)

export default router;
