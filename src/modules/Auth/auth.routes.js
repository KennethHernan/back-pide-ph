import { Router } from "express";
import { changePassword, createUser, getUserDataId, getUserData, getAllUsers, signin, verifyToken, logout, changeAll } from "./controller.js";

const router = Router()
router.get("/getAllUsers", getAllUsers) // Añadido
router.get("/getUserData/:username", getUserData) // Añadido
router.get("/getUserDataId/:id", getUserDataId) // Añadido
router.post("/changeAll", changeAll) // Añadido
router.post("/createUser", createUser)
router.post("/signin", signin)
router.post("/changePassword", changePassword)
router.post("/verifyToken", verifyToken)
router.post("/logout", logout)

export default router;