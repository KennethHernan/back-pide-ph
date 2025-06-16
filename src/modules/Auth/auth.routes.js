import { Router } from "express";
import { createUser, createAudit,changeDniReniec,getAllService,createService,deleteDniReniec, verifyPide, createDniReniec, seachID, getAllUsers, getAllDniReniec , signin, verifyToken, logout, changeAll, getAllAudit, changeUserRol, deleteUser, sendHeartbeat, requestPasswordReset, resetPassword } from "./controller.js";

const router = Router()
router.get("/getAllUsers", getAllUsers) // Añadido
router.get("/getAllAudit", getAllAudit) // Añadido
router.get("/getAllDniReniec", getAllDniReniec) // Añadido
router.get("/getAllService", getAllService) // Añadido
router.get("/getSeachId/:userId", seachID) // Añadido

router.post("/changeAll", changeAll) // Añadido
router.post("/changeUserRol", changeUserRol) // Añadido 
router.post("/changeDniReniec", changeDniReniec) // Añadido
router.post("/deleteUser", deleteUser) // Añadido
router.post("/deleteDniReniec", deleteDniReniec) // Añadido
router.post("/heartbeat", sendHeartbeat); // Añadido
router.post("/forgot-password", requestPasswordReset); // Añadido
router.post("/reset-password", resetPassword); // Añadido
router.post("/createAudit", createAudit) // Añadido
router.post("/createService", createService) // Añadido
router.post("/createDniReniec", createDniReniec) // Añadido
router.post("/verifyPide", verifyPide) // Añadido

router.post("/createUser", createUser)
router.post("/signin", signin)
router.post("/verifyToken", verifyToken)
router.post("/logout", logout)

export default router;