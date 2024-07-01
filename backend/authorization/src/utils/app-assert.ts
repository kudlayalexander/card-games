import assert from "assert";
import AppError from "./app-error";
import * as http from "http";
import {HttpStatusCode} from "../constants/http";
import AppErrorCode from "../constants/app-error-code";

type AppAssert = (
    condition: any,
    httpStatusCode: HttpStatusCode,
    message: string,
    appErrorCode?: AppErrorCode
) => asserts condition;

const appAssert: AppAssert = (
    condition,
    httpStatusCode,
    message,
    appErrorCode
) => assert(condition, new AppError(httpStatusCode, message, appErrorCode))

export default appAssert;