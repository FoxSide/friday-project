import axios, {AxiosResponse} from "axios";

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    // baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

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