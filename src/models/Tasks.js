import {model, Schema} from 'mongoose';

const taskSchema = new Schema({
    content: String,
    date: Date, 
    is_completed: Boolean
}, {
    timestamps: true,
    versionKey: false
})

export default model('Tasks', taskSchema)