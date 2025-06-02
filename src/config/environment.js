import { config } from "dotenv"
config()

export const env = {
    PORT: process.env.PORT,
    API_DNI_URL: process.env.API_DNI_URL,
    DNI_RENIEC_URL: process.env.DNI_RENIEC_URL,
    PREDIO_SUNARP_URL: process.env.PREDIO_SUNARP_URL,
    OFICINAS_SUNARP_URL: process.env.OFICINAS_SUNARP_URL,
    PLACA_SUNARP_URL: process.env.PLACA_SUNARP_URL,
    ASIENTOS_SUNARP_URL: process.env.ASIENTOS_SUNARP_URL,
    DOCUMENT_SUNARP_URL: process.env.DOCUMENT_SUNARP_URL,
    DNI_USER_RENIEC: process.env.DNI_USER_RENIEC,
    RUC_USER_RENIEC: process.env.RUC_USER_RENIEC,
    PASS_USER_RENIEC: process.env.PASS_USER_RENIEC,
    USER_SUNARP: process.env.USER_SUNARP,
    PASS_SUNARP: process.env.PASS_SUNARP,
    jwt_secret: process.env.jwt_secret,
    DB_URI: process.env.DB_URI,
    OUTLOOK_USER: process.env.OUTLOOK_USER,
    OUTLOOK_PASS: process.env.OUTLOOK_PASS
}