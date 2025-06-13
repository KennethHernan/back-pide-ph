import axios from "axios"
import { env } from "../../config/environment.js";
import { dniDto } from "./dto/reniec-dto.js";

// Modificar ruta 

export const getDniInfo = async (req, res) => {
    try {
        const { dni } = req.params;
        const PIDE = {
            "nuDniConsulta": dni,
            "nuDniUsuario": env.DNI_USER_RENIEC, // CASAR DNI-MAIN DE BASE DE DATOS SEGUN CORREO ELECTRONICO
            "nuRucUsuario": env.RUC_USER_RENIEC,
            "password": env.PASS_USER_RENIEC
        }
        const { data } = await axios.post(env.DNI_RENIEC_URL, { PIDE } );
        const dniInfoDto = dniDto(data)

        return res.json(dniInfoDto)
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}