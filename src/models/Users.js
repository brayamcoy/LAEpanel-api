import {model, Schema} from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    name: String,
    lastname: String,
    phone: Number,
    active: Boolean,
    roles: [{
        ref: "Roles",
        type: Schema.Types.ObjectId
    }]
}, {
    timestamps: true,
    versionKey: false
})

userSchema.statics.encryptPassword = async(password) =>{

    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password, salt)
}

userSchema.statics.comparePassword = async(password, recievePassword) => {

    return await bcrypt.compare(password, recievePassword)
}

export default model('Users', userSchema)