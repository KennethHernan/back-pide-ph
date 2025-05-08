import { Router } from "express";
import { changePassword, createUser, getUserData, signin } from "./controller.js";

const router = Router()

router.get("/getUserData/:id", getUserData)
router.post("/createUser", createUser)
router.post("/signin", signin)
router.post("/changePassword", changePassword)

export default router;