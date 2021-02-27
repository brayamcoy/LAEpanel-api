import {Router} from 'express';
import * as TaskControl from '../controllers/tasks.js';
import {verifyToken} from '../middlewares/auth';

const router = Router();

router.get('/api/v1/tasks', verifyToken, TaskControl.getTask)

router.get('/api/v1/tasks/:id', verifyToken, TaskControl.getTaskById)

router.post('/api/v1/tasks', verifyToken, TaskControl.createTask)

router.put('/api/v1/tasks/:id', verifyToken, TaskControl.updateTaskById)

router.delete('/api/v1/tasks/:id', verifyToken, TaskControl.deleteTaskById)

export default router;
