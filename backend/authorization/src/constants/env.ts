import {ParseHelper} from "../utils/parse-helper";
import "dotenv/config";


export const NODE_ENV = ParseHelper.parseString(process.env.NODE_ENV);
export const PORT = ParseHelper.parseString(process.env.PORT);
export const DB_URI = ParseHelper.parseString(process.env.DB_URI);
export const APP_ORIGIN = ParseHelper.parseString(process.env.APP_ORIGIN);
export const JWT_SECRET = ParseHelper.parseString(process.env.JWT_SECRET);
export const JWT_REFRESH_SECRET = ParseHelper.parseString(process.env.JWT_REFRESH_SECRET);
export const EMAIL_SENDER = ParseHelper.parseString(process.env.EMAIL_SENDER);
export const RESEND_API_KEY = ParseHelper.parseString(process.env.RESEND_API_KEY);