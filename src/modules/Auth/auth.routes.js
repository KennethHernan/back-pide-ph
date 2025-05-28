import { Router } from "express";
import { createUser, getAllUsers, signin, verifyToken, logout, changeAll, changeUserRol, deleteUser, sendHeartbeat } from "./controller.js";

const router = Router()
router.get("/getAllUsers", getAllUsers) // Añadido
router.post("/changeAll", changeAll) // Añadido
router.post("/changeUserRol", changeUserRol) // Añadido
router.post("/deleteUser", deleteUser) // Añadido
router.post("/heartbeat", sendHeartbeat); // Añadido
router.post("/createUser", createUser)
router.post("/signin", signin)
router.post("/verifyToken", verifyToken)
router.post("/logout", logout)

export default router;