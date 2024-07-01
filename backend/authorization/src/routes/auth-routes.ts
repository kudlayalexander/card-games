import {Router} from "express";
import {
    loginController,
    logoutController,
    refreshController,
    registerController, resetPasswordController,
    sendPasswordResetController,
    verifyController
} from "../controllers/auth-controller";

const authRoutes: Router = Router();

authRoutes.post("/register", registerController);
authRoutes.post("/login", loginController);
authRoutes.get("/logout", logoutController);
authRoutes.get("/refresh", refreshController);
authRoutes.get("/email/verify/:code", verifyController);
authRoutes.post("/password/forgot", sendPasswordResetController);
authRoutes.post("/password/reset", resetPasswordController);
export default authRoutes;