import express from "express";
import cors from "cors"
import morgan from "morgan";
import reniecRoutes from "./modules/Reniec/reniec.routes.js"
import sunarpRoutes from "./modules/Sunarp/sunarp.routes.js"
import authRoutes from  "./modules/Auth/auth.routes.js"
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'OPTIONS', 'HEAD', 'CONNECT'],
}));
morgan.token('body', (req, res) => {
    if (res._body) {
        return JSON.stringify(res._body);
    }
    return '-';
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.use("/api/v1/reniec", reniecRoutes)
app.use("/api/v1/sunarp", sunarpRoutes)
app.use("/api/v1/user", authRoutes)

app.get("/", (req, res) => {
    res.json({
        message: "Bienvenido al servicio MDPH"
    })
})

app.post('/api/v1/user/disconnect', express.text(), (req, res) => {
  try {
    const userId = JSON.parse(req.body);
    console.log(`Usuario desconectado: ${userId}`);
    res.sendStatus(200);
  } catch (error) {
    console.error("Error al procesar desconexión:", error.message);
    res.sendStatus(400);
  }
});


export default app;