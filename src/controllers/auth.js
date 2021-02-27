import Users from '../models/Users';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    const {username, email, password, name, lastname, phone, roles} = req.body;

    const user = new Users({
        username,
        email,
        password: Users.encryptPassword(password),
        name,
        lastname,
        phone
    })

    if(roles){
        const foundRoles = Roles.find({name: {$in: roles}});
        user.roles = foundRoles.map(role => role._id);
    }else{
        const roleDefault = Roles.find({name: "user"});
        user.roles = [roleDefault._id];
    }

    const savedUser = await Tasks.save();
    const token = jwt.sign({id: savedUser._id}, process.env.JWT_SECRET, {

        expiresIn: 86400 //un día aprox
    });

    res
        .status(200)
        .json({token})
}

export const login = async (req, res) => {
     res.json({message: "login"})
}