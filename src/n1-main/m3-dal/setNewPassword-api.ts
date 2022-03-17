import {AxiosResponse} from "axios";
import {instance} from "./a1-instance-api";


export const authAPI = {
    setNewPassword(password: string, resetPasswordToken: string) {
        const requestData: RequestDataType = {
            password: password,
            resetPasswordToken: resetPasswordToken,
        }
        return instance
            .post<RequestDataType, AxiosResponse<PasswordRecoveryResponseType>>('auth/set-new-password', requestData)
            .then(res => res.data)
    }
}

export type RequestDataType = {
    password: string;
    resetPasswordToken: string;
}

export type PasswordRecoveryResponseType = {
    info: string;
    error: string;
}