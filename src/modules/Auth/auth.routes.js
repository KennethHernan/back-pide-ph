import { Router } from "express";
import { createUser, createAudit,seachID, getAllUsers, signin, verifyToken, logout, changeAll, getAllAudit, changeUserRol, deleteUser, sendHeartbeat, requestPasswordReset, resetPassword } from "./controller.js";

const router = Router()
router.get("/getAllUsers", getAllUsers) // Añadido
router.get("/getAllAudit", getAllAudit) // Añadido
router.get("/getSeachId/:userId", seachID) // Añadido

router.post("/changeAll", changeAll) // Añadido
router.post("/changeUserRol", changeUserRol) // Añadido
router.post("/deleteUser", deleteUser) // Añadido
router.post("/heartbeat", sendHeartbeat); // Añadido
router.post("/forgot-password", requestPasswordReset); // Añadido
router.post("/reset-password", resetPassword); // Añadido

router.post("/createUser", createUser)
router.post("/createAudit", createAudit)
router.post("/signin", signin)
router.post("/verifyToken", verifyToken)
router.post("/logout", logout)

export default router;