import {AxiosResponse} from "axios";
import {UserProfileStateType} from "../m2-bll/a2-reducers/profile-reducer";
import {instance} from "./a1-instance-api";

export const authAPI = {
  login(data: LoginParamsType) {
    return instance.post<LoginParamsType, AxiosResponse<ResponseType>>('auth/login', data)
  },
  logOut() {
    return instance.delete<{},AxiosResponse<LogOutResponseType>>(`auth/me`, {})
  },
  me() {
    return instance.post<{},AxiosResponse<UserProfileStateType>>(`auth/me`, {})
  },
}

export type LoginParamsType = {
  email: string
  password: string
  rememberMe: boolean
}

export type LogOutResponseType = {
  info: string
  error: string
}

export type ResponseType = {
  _id: string;
  email: string;
  name: string;
  avatar?: string;
  publicCardPacksCount: number;

  created: Date;
  updated: Date;
  isAdmin: boolean;
  verified: boolean;
  rememberMe: boolean;

  error?: string;
}