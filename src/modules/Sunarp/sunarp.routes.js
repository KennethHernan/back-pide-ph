import { Router } from "express";
import { consultTitularJuridica, consultTitularNatural, getOficinas, getPlacaVehicular } from "./sunarp.controller.js";

const router = Router();

router.post("/consultTitularNatural", consultTitularNatural)
router.post("/consultTitularJuridica", consultTitularJuridica)
router.get("/getOficinas", getOficinas)
router.post("/getPlacaVehicular", getPlacaVehicular)

export default router;