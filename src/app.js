import express from 'express';
import morgan from 'morgan';

//Importando Rutas
import usersRoutes from './routes/users';
import tasksRoutes from './routes/tasks';

const app = express();
app.use(morgan('dev'));

app.get('/', (req, res) =>{
    res.json("Bienvenido a la api")
})

app.use('/api/v1/',usersRoutes);
app.use(tasksRoutes);

export default app;