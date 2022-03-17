import {AxiosResponse} from "axios";
import {UserProfileStateType} from "../m2-bll/a2-reducers/profile-reducer";
import {instance} from "./a1-instance-api";




export type UpdateUserResponseType = {
    updatedUser: UserProfileStateType
    error?: string
}


export const authAPI = {
    me() {
        return instance.post<{}, AxiosResponse<UserProfileStateType>>(`auth/me`, {})
    },
}

export const profileAPI = {
    updateUserData(name: string, avatar: string) {
        return instance.put<{ name: string, avatar: string }, AxiosResponse<UpdateUserResponseType>>(`auth/me`, {
            name,
            avatar
        })
    },
}
