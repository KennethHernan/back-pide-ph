import User from "./model/user.js"
import { createtoken } from "../../utils/createToken.js";

export const createUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const newUser = new User({ username, password });
        await newUser.save();
        res.status(201).json({
            message: "Usuario creado exitosamente"
        });
    } catch (error) {
        return res.status(500).json(error);
    }
}


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


export const signin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const userFound = await User.findOne({ username });
        if (!userFound) return res.status(400).json({ message: "Usuario no encontrado" });
        const matchPassword = await userFound.comparePassword(password);

        if(!matchPassword) return res.status(401).json({ token: null, message: "Contraseña invalida" })

        return res.status(200).json({
            token: createtoken(userFound),
            message: "success"
        })

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}


export const getUserData = async (req, res) => {
    try {
        const { id } = req.params;
        return res.status(200).json({ 
            user: await User.findById(id).select("-password"),
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });   
    }
}