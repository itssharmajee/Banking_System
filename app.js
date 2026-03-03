import express from "express"
import authRoutes from "./src/routes/auth.route.js";
import cookieParser from "cookie-parser";
import accountRouters from "./src/routes/account.route.js";
const app = express();


//Some required middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())

// Router
app.use("/api/auth",authRoutes);
app.use("/api/account",accountRouters);
export {
    app
}