import {AxiosResponse} from "axios";
import {
    fromMessage,
    htmlMessage
} from "../../n2-features/f1-auth/a5-password-recovery/constants/recoveryPasswordRequest";
import {instance} from "./a1-instance-api";

export const authAPI = {
    recovery(email: string) {
        const requestData: RequestDataType = {
            email: email,
            from: fromMessage,
            message: htmlMessage,
        }
        return instance
            .post<RequestDataType, AxiosResponse<PasswordRecoveryResponseType>>('auth/forgot', requestData)
            .then(res => res.data)
    }
}

export type RequestDataType = {
    email: string;
    from: string;
    message: string;
}

export type PasswordRecoveryResponseType = {
    info: string;
    error: string;
}