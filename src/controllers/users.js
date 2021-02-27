import Users from '../models/Users';
import jwt from 'jsonwebtoken';
import Roles from '../models/Roles';

export const createUser = async (req, res) => {

    const {username, email, password, name, lastname, phone, roles} = req.body;

    const user = new Users({
        username,
        email,
        password: await Users.encryptPassword(password),
        name,
        lastname,
        phone,
        active: true
    })

    if(roles){
        const foundRoles = await Roles.find({name: {$in: roles}});
        user.roles = foundRoles.map(role => role._id);
    }else{
        const roleDefault = await Roles.findOne({name: "user"});
        user.roles = [roleDefault._id];
    }

    const savedUser = await user.save();
    console.log(savedUser);

    const token = await jwt.sign({id: savedUser._id}, process.env.JWT_SECRET, {

        expiresIn: 86400 //un día aprox
    });

    res
        .status(200)
        .json({token})

}

export const getUser = async (req, res) => {

    try{
        const user = await Users.find().populate('roles');
        res
        .status(200)
        .json(user)
    }catch(error){
        res
        .status(400)
        .json({message: "Error al mostrar los usuarios"})
    }

}

export const getUserById = async (req, res) => {

    try{ 
        const user = await Users.findById(req.params.id).populate('roles');
        res
            .status(200)
            .json(user)
    }
    catch(error){
        res
            .status(400)
            .json({message: "El usuario no ha sido encontrado"})
    }

}

export const updateUserById =  async (req, res) => {

    try{
        const user = await Users.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        res
            .status(200)
            .json(user)
    }catch(error){
        res
            .status(400)
            .json({message: "Error al actualizar el usuario"})
    }

}

export const deleteUserById = async (req, res) => {

    try{
        const user = await Users.findByIdAndDelete(req.params.id);
        res
            .status(204)
            .json()
    }catch{
        res
            .status(400)
            .json({message: "Error al eliminar el usuario"})
    }

}

