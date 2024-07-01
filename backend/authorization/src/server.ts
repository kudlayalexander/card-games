import express, {Express, NextFunction} from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {connectToDatabase} from "./config/db";
import {ParseHelper} from "./utils/parse-helper";
import {errorHandler} from "./middleware/error-handler";
import authRoutes from "./routes/auth-routes";
import {APP_ORIGIN, PORT} from "./constants/env";
import {authenticate} from "./middleware/authenticate";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(
    cors({
        origin: APP_ORIGIN,
        credentials: true,
    })
);

app.use(cookieParser());

// auth routes
app.use("/api/auth", authRoutes);

app.use(errorHandler);

app.listen(PORT, async () => {
    console.log(`Listening ${PORT} port`);
    await connectToDatabase();
});