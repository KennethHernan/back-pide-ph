import express from "express";
import cors from "cors"
import morgan from "morgan";
import reniecRoutes from "./modules/Reniec/reniec.routes.js"
import sunarpRoutes from "./modules/Sunarp/sunarp.routes.js"
import authRoutes from  "./modules/Auth/auth.routes.js"

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'OPTIONS'],
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


export default app;