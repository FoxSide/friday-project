import React from 'react';
import {Dispatch} from "redux";
import {authAPI} from "../../m3-dal/recovery-api";

const initialPasswordRecoveryState: PasswordRecoveryStateType = {
  isEmailSend: false,
  email: "bla bla",
  isLoading: false,
  error: "",
}

export const passwordRecoveryReducer = (state: PasswordRecoveryStateType = initialPasswordRecoveryState, action: PasswordRecoveryActionType) => {
  switch (action.type) {
    case "passwordRecovery/SET-ERROR":
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
export const setErrorPasswordRecoveryAC = (error: string) =>
    ({type: 'passwordRecovery/SET-ERROR', payload: {error}} as const)
export const setIsEmailSendAC = (isEmailSend: boolean, email: string) =>
    ({type: 'passwordRecovery/SET-IS-EMAIL-SEND', payload: {isEmailSend, email}} as const)

export const setIsEmailSendTC = (email: string) => async (dispatch: Dispatch<PasswordRecoveryActionType>) => {
  try {
    dispatch(setIsLoadingAC(true))
    await authAPI.recovery(email)
    dispatch(setIsEmailSendAC(true, email))
  } catch (e: any) {
    dispatch(setErrorPasswordRecoveryAC(e.response.data.error))
  } finally {
    dispatch(setIsLoadingAC(false))
  }
}

type PasswordRecoveryStateType = {
  isEmailSend: boolean;
  email: string;
  isLoading: boolean;
  error: string;
}
type PasswordRecoveryActionType =
    | ReturnType<typeof setIsEmailSendAC>
    | ReturnType<typeof setIsLoadingAC>
    | ReturnType<typeof setErrorPasswordRecoveryAC>