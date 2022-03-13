import axios, { AxiosResponse } from "axios";
import {UserProfileStateType} from "../m2-bll/a2-reducers/profile-reducer";

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true
})


export type UpdateUserResponseType = {
    updatedUser: UserProfileStateType
    error?: string
}


export const authAPI = {
    me() {
        return instance.post<{},AxiosResponse<UserProfileStateType>>(`auth/me`, {})
    },
}

export const profileAPI = {
    updateUserData(name: string, avatar: string  ) {
        return instance.put<{name: string, avatar: string},AxiosResponse<UpdateUserResponseType>>(`auth/me`, {name, avatar})
    },
    
}