import catchErrors from "../utils/catch-errors";
import {
    registerSchema,
    loginSchema,
    verificationCodeSchema,
    emailSchema,
    resetPasswordSchema
} from "./schemas/auth-schemas";
import {
    createAccount,
    loginUser,
    refreshUserAccessToken, resetPassword,
    sendPasswordResetEmail,
    verifyEmail
} from "../services/auth-service";
import {CREATED, OK, UNAUTHORIZED} from "../constants/http";
import {
    clearAuthCookies,
    getAccessTokenCookieOptions,
    getRefreshTokenCookieOptions,
    setAuthCookies
} from "../utils/cookies";
import {verifyToken} from "../utils/jwt";
import sessionModel from "../models/session-model";
import appAssert from "../utils/app-assert";

export const registerController = catchErrors(
    async(req, res) => {
        const request = registerSchema.parse({
            ...req.body,
            userAgent: req.headers["user-agent"],
        });

        // call service
        const {
            user,
            accessToken,
            refreshToken
        } = await createAccount(request);
        // return response

        return setAuthCookies({res, accessToken, refreshToken})
            .status(CREATED)
            .json(user);
    }
);

export const loginController = catchErrors(
    async(req, res) => {
        const request = loginSchema.parse({
            ...req.body,
            userAgent: req.headers["user-agent"],
        });


        const {
            accessToken,
            refreshToken
        } = await loginUser(request);


        return setAuthCookies({res, accessToken, refreshToken})
            .status(OK)
            .json({
                message: "Login successful",
            });
    }
);

export const logoutController = catchErrors(
    async (req, res) => {
        const accessToken = req.cookies.accessToken as string | undefined;
        const {payload, error} = verifyToken(accessToken || "");

        if (payload) {
            await sessionModel.findByIdAndDelete(payload.sessionId);
        }

        return clearAuthCookies(res)
            .status(OK)
            .json({
            message: "Logout successful",
        });
    });

export const refreshController = catchErrors(
    async(req, res) => {
        const refreshToken = req.cookies.refreshToken as string | undefined;
        appAssert(refreshToken, UNAUTHORIZED, "Missing refresh token");

        const {
            accessToken,
            newRefreshToken
        } = await refreshUserAccessToken(refreshToken);

        if (newRefreshToken) {
            res.cookie("refreshToken", newRefreshToken, getRefreshTokenCookieOptions());
        }

        return res
            .status(OK)
            .cookie("accessToken",
                accessToken,
                getAccessTokenCookieOptions()
            )
            .json({
            message: "Access token refreshed",
        });
    }
);

export const verifyController = catchErrors(
    async (req, res) => {
        const verificationCode = verificationCodeSchema.parse(req.params.code);

        await verifyEmail(verificationCode);

        return res
            .status(OK)
            .json({
                message: "Email was successfully verified"
            });
    }
);

export const sendPasswordResetController = catchErrors(
    async(req, res) => {
        const email = emailSchema.parse(req.body.email);

        await sendPasswordResetEmail(email);

        return res
            .status(OK)
            .json({
                message: "Reset password email sent"
            });
    }
);

export const resetPasswordController = catchErrors(
    async(req, res) => {
        const request = resetPasswordSchema.parse(req.body);

        await resetPassword(request);

        return clearAuthCookies(res)
            .status(OK)
            .json({
                message: "Password reset successfully"
            });
    }
);