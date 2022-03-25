import React from 'react';
import {Dispatch} from "redux";
import {authAPI} from "../../m3-dal/setNewPassword-api";
import {setIsLoadingAC} from "./password-recovery-reducer";
import {setAppStatusAC, SetAppStatusActionType} from "./app-reducer";
import {setAppErrorAC, SetAppErrorType, setAppSuccessAC, SetAppSuccessType} from "./error-reducer";

const initialNewPasswordState: NewPasswordStateType = {
  isSetNewPassword: false,
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

export const setIsSetNewPasswordTC = (password: string, token: string) => async (dispatch: Dispatch<NewPasswordActionType>) => {
  dispatch(setAppStatusAC("loading"))
  try {
    dispatch(setIsLoadingAC(true))
    let res = await authAPI.setNewPassword(password, token);
    dispatch(setIsSetNewPasswordAC(true))
    dispatch(setAppSuccessAC(res.info))
    dispatch(setAppStatusAC("succeeded"))
  } catch (e: any) {
    dispatch(setAppErrorAC(e.response.data.error))
    dispatch(setAppStatusAC('failed'))
  }
}

type NewPasswordStateType = {
  isSetNewPassword: boolean;
}
export type NewPasswordActionType =
    | ReturnType<typeof setIsSetNewPasswordAC>
    | ReturnType<typeof setIsLoadingAC>
    | SetAppErrorType
    | SetAppStatusActionType
    | SetAppSuccessType