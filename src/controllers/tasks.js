import Tasks from '../models/Tasks';


export const createTask = async (req, res) => {
    
    const {content} = req.body;

    const task= new Tasks({
        content,
        date: new Date(),
        is_completed: false
    })

    await task.save()

    res.json({message: "Se ha agregado la tarea satisfactoriamente", task})

}  

export const getTask = async (req, res) => {
    try{
        const task = await Tasks.find();
        res
        .status(200)
        .json(task)
    }catch(error){
        res
        .status(400)
        .json({message: "Error al mostrar las tareas"})
    }
    
}

export const getTaskById = async (req, res) => {

    try{ 
        const task = await Tasks.findById(req.params.id);
        res
            .status(200)
            .json(task)
    }
    catch(error){
        res
            .status(400)
            .json({message: "La tarea no ha sido encontrada"})
    }
}

export const updateTaskById = async (req, res) => {
    try{
        const task = await Tasks.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        res
            .status(200)
            .json(task)
    }catch(error){
        res
            .status(400)
            .json({message: "Error al actualizar la tarea"})
    }
   

}

export const deleteTaskById = async (req, res) => {
    
    try{
        const task = await Tasks.findByIdAndDelete(req.params.id)
        res
            .status(204)
            .json()
    }catch(error){
        res
            .status(400)
            .json({message: "Error al eliminar la tarea"})
    }
}

