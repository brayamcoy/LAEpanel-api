import jwt from 'jsonwebtoken';
import Users from '../models/Users';
import {ROLES} from '../models/Roles';

export const verifyToken = async(req, res, next) => {

    try {

        const token = req.headers["x-access-token"];

        if (!token) 
            return res.status(403).json({message: "El token no ha sido proporcionado"});
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = Users.findById(decoded.id, {password: 0});

        if (!user) 
            return res.status(404).json({message: "Para acceder debe registrarse"});
        
        next();

    } catch (error) {
        return res.status(401).json({message: "Debes proporcionar un token valido"});
    }

}

export const isModerator = async (req, res, next) => {
    try {

      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      const user = await User.findById(decoded.id);
      const roles = await Role.find({ _id: { $in: user.roles } });
  
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }
      }
  
      return res.status(403).json({ message: "Requiere ser rol moderador para esta acción!" });
    } catch (error) {
      console.log(error)
      return res.status(500).send({ message: error });
    }
  };
  
  export const isAdmin = async (req, res, next) => {
    try {
      const user = await User.findById(req.userId);
      const roles = await Role.find({ _id: { $in: user.roles } });
  
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }
  
      return res.status(403).json({ message: "Se requiere el rol de administrador para esta acción!" });
    } catch (error) {
      console.log(error)
      return res.status(500).send({ message: error });
    }
  };

  export const checkDuplicateUsernameOrEmail = async (req, res, next) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (user)
        return res.status(400).json({ message: "El usuario ya existe " });
      const email = await User.findOne({ email: req.body.email });
      if (email)
        return res.status(400).json({ message: "El email ya existe" });
      next();
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };
  
  export const checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
      for (let i = 0; i < req.body.roles.length; i++) {
        if (!ROLES.includes(req.body.roles[i])) {
          return res.status(400).json({
            message: `El rol ${req.body.roles[i]} no existe intenta nuevamente`,
          });
        }
      }
    }
  
    next();
  };