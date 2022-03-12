import axios, {AxiosResponse} from "axios";
import {UserProfileStateType} from "../m2-bll/a2-reducers/login-reducer";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
  withCredentials: true,
})

export const authAPI = {
  login(data: LoginParamsType) {
    return instance.post<LoginParamsType, AxiosResponse<ResponseType>>('auth/login', data)
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