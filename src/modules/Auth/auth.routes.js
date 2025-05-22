import { Router } from "express";
import { createUser, getUserDataId, getUserData, getAllUsers, signin, verifyToken, logout, changeAll, changeUserRol, deleteUser } from "./controller.js";

const router = Router()
router.get("/getAllUsers", getAllUsers) // Añadido
router.get("/getUserData/:username", getUserData) // Añadido
router.get("/getUserDataId/:id", getUserDataId) // Añadido
router.post("/changeAll", changeAll) // Añadido
router.post("/changeUserRol", changeUserRol) // Añadido
router.post("/deleteUser", deleteUser) // Añadido
router.post("/createUser", createUser)
router.post("/signin", signin)
router.post("/verifyToken", verifyToken)
router.post("/logout", logout)

export default router;