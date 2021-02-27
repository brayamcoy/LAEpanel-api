import {Router} from 'express';
import * as TaskControl from '../controllers/tasks.js';

const router = Router();

router.get('/api/v1/tasks', TaskControl.getTask)

router.get('/api/v1/tasks/:id', TaskControl.getTaskById)

router.post('/api/v1/tasks', TaskControl.createTask)

router.put('/api/v1/tasks/:id', TaskControl.updateTaskById)

router.delete('/api/v1/tasks/:id', TaskControl.deleteTaskById)

export default router;
