import {Router} from 'express';
import * as UserControl from '../controllers/users.js';

const router = Router();

router.get('/api/v1/users', UserControl.getUser)

router.get('/api/v1/users/:id', UserControl.getUserById)

router.post('/api/v1/users', UserControl.createUser)

router.put('/api/v1/users/:id', UserControl.updateUserById)

router.delete('/api/v1/users/:id', UserControl.deleteUserById)

export default router;
