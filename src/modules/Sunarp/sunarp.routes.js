import { Router } from "express";
import { consultTitularJuridica, consultTitularNatural, getOficinas, getPlacaVehicular, getAsientos, downloadAsientos } from "./sunarp.controller.js";

const router = Router();

router.post("/consultTitularNatural", consultTitularNatural)
router.post("/consultTitularJuridica", consultTitularJuridica)
router.get("/getOficinas", getOficinas)
router.post("/getPlacaVehicular", getPlacaVehicular)
router.post("/getAsientos", getAsientos )
router.post("/downloadAsientos", downloadAsientos )

export default router;