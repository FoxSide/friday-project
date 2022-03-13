import axios, {AxiosResponse} from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true,
})

export const registrationAPI = {

    addUser(email: string, password: string) {
        return instance.post<{ email: string, password: string }, AxiosResponse<addUserResponse>>(`/auth/register`, {
            email,
            password
        });
    }
}

export type addUserResponse = {
    addedUser: any
    error: string
}

