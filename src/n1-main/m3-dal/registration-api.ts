import {AxiosResponse} from "axios";
import {instance} from "./a1-instance-api";

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

