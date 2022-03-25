import React from 'react';
import {Dispatch} from "redux";
import {authAPI} from "../../m3-dal/recovery-api";
import {setAppErrorAC, SetAppErrorType, setAppSuccessAC, SetAppSuccessType} from "./error-reducer";
import {setAppStatusAC, SetAppStatusActionType} from "./app-reducer";

const initialPasswordRecoveryState: PasswordRecoveryStateType = {
  isEmailSend: false,
  email: "bla bla",
  isLoading: false,
}

export const passwordRecoveryReducer = (state: PasswordRecoveryStateType = initialPasswordRecoveryState, action: PasswordRecoveryActionType) => {
  switch (action.type) {
    case "passwordRecovery/SET-IS-LOADING":
    case "passwordRecovery/SET-IS-EMAIL-SEND":
      return {
        ...state,
        ...action.payload
      }
    default: {
      return state
    }
  }
};
export const setIsLoadingAC = (isLoading: boolean) =>
    ({type: 'passwordRecovery/SET-IS-LOADING', payload: {isLoading}} as const)
export const setIsEmailSendAC = (isEmailSend: boolean, email: string) =>
    ({type: 'passwordRecovery/SET-IS-EMAIL-SEND', payload: {isEmailSend, email}} as const)

export const setIsEmailSendTC = (email: string) => async (dispatch: Dispatch<PasswordRecoveryActionType>) => {
  dispatch(setAppStatusAC("loading"))
  try {
    dispatch(setIsLoadingAC(true))
   let res = await authAPI.recovery(email)
    dispatch(setIsEmailSendAC(true, email))
    dispatch(setAppSuccessAC(res.info))
    dispatch(setAppStatusAC("succeeded"))
  } catch (e: any) {
    dispatch(setAppErrorAC(e.response.data.error))
    dispatch(setAppStatusAC('failed'))
  }
}

type PasswordRecoveryStateType = {
  isEmailSend: boolean;
  email: string;
  isLoading: boolean;
}
export type PasswordRecoveryActionType =
    | ReturnType<typeof setIsEmailSendAC>
    | ReturnType<typeof setIsLoadingAC>
    | SetAppErrorType
    | SetAppStatusActionType
    | SetAppSuccessType