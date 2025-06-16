import { User, updateUserLastSeen } from "./model/user.js";
import Audit from "./model/audit.js";
import Service from "./model/service.js";

import jwt from "jsonwebtoken";
import { createtoken } from "../../utils/createToken.js";
import { env } from "../../config/environment.js";
import crypto from "crypto";
import { sendPasswordResetEmail } from "../../utils/mailer.js";
import dniReniec from "./model/dniReniec.js";

// Metodo - Crear nuevo usuario
export const createUser = async (req, res) => {
  // rol añadido
  try {
    const { username, name, dni, password, email, rol, acceso } = req.body;
    const lastSeen = "";
    const isOnline = false;

    // Validaciones
    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(500).json({ message: "El Usuario ya existe" });

    const existingDni = await User.findOne({ dni });
    if (existingDni)
      return res.status(500).json({ message: "El DNI ya existe" });

    const existingName = await User.findOne({ name });
    if (existingName)
      return res.status(500).json({ message: "El Nombre Completo ya existe" });

    const newUser = new User({
      username,
      name,
      dni,
      password,
      email,
      rol,
      acceso,
      lastSeen,
      isOnline,
    });
    await newUser.save();
    res.status(201).json({
      message: "Usuario creado exitosamente",
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};
// Metodo - Cambiar toda DATA:
export const changeAll = async (req, res) => {
  try {
    const { id, username, password, rol, acceso } = req.body;
    const objUser = await User.findById(id);
    if (!objUser)
      return res.status(404).json({ message: "Usuario no encontrado" });

    objUser.username = username;
    objUser.password = password;
    objUser.rol = rol;
    objUser.acceso = acceso;
    await objUser.save();
    return res.status(200).json({ message: "Datos Actualizados" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
// Metodo - Cambiar DNI ADMIN:
export const changeDniReniec = async (req, res) => {
  try {
    const { email, dni } = req.body;

    const objUser = await dniReniec.findOne({email: email});
    if (!objUser)
      return res.status(404).json({ message: "Email no encontrado" });

    objUser.dni = dni;

    await objUser.save();
    return res.status(200).json({ message: "DNI Actualizado" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
// Metodo - Cambiar Usuario y/o Rol DATA:
export const changeUserRol = async (req, res) => {
  try {
    const { id, username, rol, acceso } = req.body;

    const objUser = await User.findById(id);
    if (!objUser)
      return res.status(404).json({ message: "Usuario no encontrado" });

    objUser.username = username;
    objUser.rol = rol;
    objUser.acceso = acceso;
    await objUser.save();
    return res.status(200).json({ message: "Datos Actualizados" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
// Metodo - Eliminar Usuario:
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.body;
    const userDeleted = await User.findByIdAndDelete(id);

    if (!userDeleted) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
// Metodo - Eliminar DNI RENIEC:
export const deleteDniReniec = async (req, res) => {
  try {
    const { id } = req.body;
    const userDeleted = await dniReniec.findByIdAndDelete(id);

    if (!userDeleted) {
      return res.status(404).json({ message: "Dato no encontrado" });
    }

    return res.status(200).json({ message: "Datos eliminado correctamente" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
// Metodo - Iniciar Sesion:
export const signin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userFound = await User.findOne({ username });
    if (!userFound)
      return res.status(400).json({ message: "Usuario no encontrado" });
    const matchPassword = await userFound.comparePassword(password);

    if (!matchPassword)
      return res
        .status(401)
        .json({ token: null, message: "Contraseña invalida" });

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
      acceso: userFound.acceso,
      token,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
// Metodo - Listar usuario:
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Metodo - Verificar Token al logear
export const verifyToken = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(403).json({ message: "No existe el token" });
    const decoded = jwt.verify(token, env.jwt_secret);
    const userFound = await User.findById(decoded.id);
    if (!userFound)
      return res.status(401).json({ message: "Usuario no encontrado" });

    return res.json({
      id: userFound._id,
      username: userFound.username,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
// Metodo - Cerrar Sesion
export const logout = async (req, res) => {
  try {
    const { userId } = req.body;

    if (userId) {
      await User.findByIdAndUpdate(userId, { isOnline: false });
    }
    res.cookie("token", "", { httpOnly: true, maxAge: 0 });

    return res.sendStatus(200);
  } catch (error) {
    console.error("Error en logout:", error);
    return res.status(500).json({ error: error.message });
  }
};
// Metodo - Modificar Online/Offline
export const sendHeartbeat = async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ success: false, message: "Falta userId" });
  }

  try {
    await updateUserLastSeen(userId);

    res.json({ success: true });
  } catch (error) {
    console.error("Error en heartbeat:", error);
    res.status(500).json({ success: false, message: "Error interno" });
  }
};
// Metodo - Enviar Correo
export const requestPasswordReset = async (req, res) => {
  const { name } = req.body;
  const user = await User.findOne({ name });
  if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

  const token = crypto.randomBytes(32).toString("hex");
  user.resetToken = token;
  user.resetTokenExpires = Date.now() + 3600000; // 1 hora
  await user.save();

  await sendPasswordResetEmail(user.username, user.email, token);
  res.json({ message: "Correo enviado" });
};
// Metodo - Cambiar Contraseña
export const resetPassword = async (req, res) => {
  const { password, token } = req.body;

  const user = await User.findOne({
    resetToken: token,
    resetTokenExpires: { $gt: Date.now() },
  });

  if (!user)
    return res.status(400).json({ message: "Token inválido o expirado" });

  user.password = password;
  user.resetToken = undefined;
  user.resetTokenExpires = undefined;
  await user.save();

  res.json({ message: "Contraseña actualizada" });
};

// Metodo - buscar por id
export const seachID = async (req, res) => {
  const { userId } = req.params;

  try {
    const userFound = await User.findById(userId).select(
      "-_id -password -name -dni -email -lastSeen -isOnline -createdAt -updatedAt"
    );
    res.status(200).json(userFound);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Metodo - Crear Audit
export const createAudit = async (req, res) => {
  try {
    const { username, metodo } = req.body;

    // Validacion
    const existingUser = await User.findOne({ username });
    if (!existingUser)
      return res.status(500).json({ message: "El Usuario no existe" });

    const newAudit = new Audit({
      username,
      metodo,
    });
    await newAudit.save();

    res.status(201).json({
      message: "Audit creado exitosamente",
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

// Metodo - Crear DNI Administrador (RENIEC)
export const createDniReniec = async (req, res) => {
  try {
    const { email, dni } = req.body;

    // Validacion
    const existingEmail = await dniReniec.findOne({ email });
    if (existingEmail)
      return res.status(500).json({ message: "El Email ya existe" });

    const newDniReniec = new dniReniec({
      email,
      dni,
    });
    await newDniReniec.save();

    res.status(201).json({
      message: "DNI administrador creado exitosamente",
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};
// Metodo - Listar Audit
export const getAllAudit = async (req, res) => {
  try {
    const audits = await Audit.find({});
    res.status(200).json(audits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Metodo - Listar Audit
export const getAllDniReniec = async (req, res) => {
  try {
    const dniRENIEC = await dniReniec.find({});
    res.status(200).json(dniRENIEC);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Metodo - Consulta por usuario
export const getAuditUser = async (req, res) => {
  try {
    const { username } = req.body;
    const totalConsultas = await Audit.countDocuments({ username: username });
    res.status(200).json(totalConsultas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Metodo - Verificar PIDE
export const verifyPide = async (req, res) => {
  try {
    const { servicio } = req.body;
    if (!servicio) return res.status(403).json({ message: "No existe Servicio" });

    const existingService = await User.findOne({ servicio });
    if (!existingService)
      return res.status(401).json({ message: "Servicio no encontrado" });

    return res.json({
      value: existingService.active
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Metodo - Crear Service PIDE
export const createService = async (req, res) => {
console.log(JSON.stringify( req.body, null, 20));

  try {
    const { service, active } = req.body;
    
    // Validacion
    const existingService = await Service.findOne({ service });
    if (existingService)
      return res.status(500).json({ message: "El Servicio ya existe" });

    const newService = new Service({
      service,
      active,
    });

    console.log(newService);
    
    await newService.save();

    res.status(201).json({
      message: "Servicio creado exitosamente",
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

// Metodo - Listar Services
export const getAllService = async (req, res) => {
  try {
    const servicePIDE = await Service.find({});
    res.status(200).json(servicePIDE);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};