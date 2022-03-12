import axios, {AxiosResponse} from "axios";
import {
    fromMessage,
    htmlMessage
} from "../../n2-features/f1-auth/a5-password-recovery/constants/recoveryPasswordRequest";

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true,
})

export const authAPI = {
    recovery(email: string) {
        const requestData: RequestDataType = {
            email: email,
            from: fromMessage,
            message: htmlMessage,
        }
        return instance.post<RequestDataType, AxiosResponse<ResponseType>>('auth/forgot', requestData)
    }
}

export type RequestDataType = {
    email: string;
    from: string;
    message: string;
}

export type ResponseType = {
    info: string;
    error: string;
}