import React from 'react';
import {Dispatch} from "redux";
import {authAPI} from "../../m3-dal/setNewPassword-api";
import {setIsLoadingAC} from "./password-recovery-reducer";

const initialNewPasswordState: NewPasswordStateType = {
  isSetNewPassword: false,
  error: "",
}
export const newPasswordReducer = (state: NewPasswordStateType = initialNewPasswordState, action: NewPasswordActionType) => {
  switch (action.type) {
    case "passwordRecovery/SET-IS-SET-NEW-PASSWORD":
      return {
        ...state,
        ...action.payload
      }
    default: {
      return state
    }
  }
};


export const setIsSetNewPasswordAC = (isSetNewPassword: boolean) =>
    ({type: 'passwordRecovery/SET-IS-SET-NEW-PASSWORD', payload: {isSetNewPassword}} as const)
export const setErrorNewPasswordAC = (error: string) =>
    ({type: 'passwordRecovery/SET-IS-SET-NEW-PASSWORD', payload: {error}} as const)

export const setIsSetNewPasswordTC = (password: string, token: string) => async (dispatch: Dispatch<NewPasswordActionType>) => {
  try {
    dispatch(setIsLoadingAC(true))
    await authAPI.setNewPassword(password, token);
    dispatch(setIsSetNewPasswordAC(true))
  } catch (e: any) {
    dispatch(setErrorNewPasswordAC(e.response.data.error))
  } finally {
    dispatch(setIsLoadingAC(false))
  }
}

type NewPasswordStateType = {
  isSetNewPassword: boolean;
  error: string;
}
type NewPasswordActionType =
    | ReturnType<typeof setIsSetNewPasswordAC>
    | ReturnType<typeof setIsLoadingAC>
    | ReturnType<typeof setErrorNewPasswordAC>