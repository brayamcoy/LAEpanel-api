import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

//Importando Rutas
import userRouter from './routes/users';
import taskRouter from './routes/tasks';

const app = express();
app.use(cors());
app.use(express.json())
app.use(morgan('dev'));

app.get('/', (req, res) =>{
    res.json("Bienvenido a la api")
})

app.use(userRouter);
app.use(taskRouter);

export default app;