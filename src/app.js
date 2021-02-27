import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import {createRoles} from './lib/initialSetup';

//Importando Rutas
import userRouter from './routes/users';
import taskRouter from './routes/tasks';
import authRouter from './routes/auth';

const app = express();
createRoles();

app.use(cors());
app.use(express.json())
app.use(morgan('dev'));

app.get('/', (req, res) =>{
    res.json("Bienvenido a la api")
})

app.use(authRouter);
app.use(userRouter);
app.use(taskRouter);

export default app;