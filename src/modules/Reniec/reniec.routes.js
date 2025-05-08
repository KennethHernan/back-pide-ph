import { Router } from "express";
import { getDniInfo } from "./reniec.controller.js";

const router = Router();

router.get("/getDniInfo/:dni", getDniInfo)

export default router;