import User from "./model/user.js"
import jwt from 'jsonwebtoken';
import { createtoken } from "../../utils/createToken.js";
import { env } from "../../config/environment.js";

// Metodo - Crear nuevo usuario
export const createUser = async (req, res) => { // rol añadido
    try {
        const { username, password, rol } = req.body;
        const newUser = new User({ username, password, rol });
        await newUser.save();
        res.status(201).json({
            message: "Usuario creado exitosamente"
        });
    } catch (error) {
        return res.status(500).json(error);
    }
}

// Metodo - Bucar cambiar contraseña:
export const changePassword = async (req, res) => {
    try {
        const { username, password } = req.body;
        const objUser = await User.findOne({ username: { $regex: username, $options: "i" } });


        if (!objUser) return res.status(404).json({ message: "Usuario no encontrado" });
        objUser.password = password;
        await objUser.save();
        return res.status(200).json({ message: "Contraseña actualizada" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

// Metodo - Cambiar toda DATA:
export const changeAll = async (req, res) => {
    try {
        const { id, username, password, rol } = req.body;
        const objUser = await User.findById(id);        
        if (!objUser) return res.status(404).json({ message: "Usuario no encontrado" });
        objUser.username = username;
        objUser.password = password;
        objUser.rol = rol;
        await objUser.save();
        return res.status(200).json({ message: "Datos Actualizados" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

// Metodo - Iniciar Sesion:
export const signin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const userFound = await User.findOne({ username });
        if (!userFound) return res.status(400).json({ message: "Usuario no encontrado" });
        const matchPassword = await userFound.comparePassword(password);     

        if(!matchPassword) return res.status(401).json({ token: null, message: "Contraseña invalida" })
            
        const token = await createtoken(userFound);
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "none",
        });
        
        // CAPTURA TODOS LOS DATOS Y LO GUARDA EN USER
        return res.status(200).json({
            id: userFound._id,
            username: userFound.username,
            rol: userFound.rol,
            token
        })

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

// Metodo - Bucar usuario por Id:
export const getUserDataId = async (req, res) => {
    try {
        const { id } = req.params;
        return res.status(200).json({ 
            user: await User.findById(id).select("-password"),
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });   
    }
}

// Metodo - Bucar usuario por nombre:
export const getUserData = async (req, res) => {
    try {
        const { username } = req.params;
        return res.status(200).json({ 
            user: await User.findOne({username}).select("-password")

        });
    } catch (error) {
        return res.status(500).json({ error: error.message });   
    }
}

// Metodo - Listar usuario:
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const verifyToken = async (req, res) => {
    try {
        console.log("✔️ Endpoint '/verifyToken' fue llamado");
        console.log("📦 req.body recibido:", req.body);

        const { token } = req.body;
        if (!token) return res.status(403).json({ message: "No existe el token" });

        const decoded = jwt.verify(token, env.jwt_secret);
        console.log("🔑 Token decodificado:", decoded);

        const userFound = await User.findById(decoded.id);
        if (!userFound) return res.status(401).json({ message: "Usuario no encontrado" });

        return res.json({
            id: userFound._id,
            username: userFound.username,
        });

    } catch (error) {
        console.error("❌ Error al verificar token:", error.message);
        return res.status(500).json({ error: error.message });
    }
};

export const logout = async (req, res) => {
    try {
        res.cookie("token", "");
        return res.sendStatus(200);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}