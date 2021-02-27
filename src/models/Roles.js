import {model, Schema} from 'mongoose';

//Roles por default que se crean al iniciar el servidor
export const ROLES = ["user", "admin", "moderator"];

const roleSchema = new Schema({
    name: String
}, {
    versionKey: false
})

export default model('Roles', roleSchema)