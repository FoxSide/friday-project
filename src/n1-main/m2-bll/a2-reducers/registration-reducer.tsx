import React from 'react';
import {Dispatch} from "redux";
import {registrationAPI} from "../../../n2-features/f1-auth/a2-register/api-registration";


const initialState: StateRegistrationReducerType = {
    error: null,
    isRegistrtion: null,
}

  const registrationReducer = (state: StateRegistrationReducerType = initialState, action: ActionType): StateRegistrationReducerType => {
  switch (action.type) {
      case "SET-ERROR":
          return  {
              ...state,
              error: action.payload.error
          }
      case "IS-REGISTRATION":
          return  {
              ...state,
              isRegistrtion: action.payload.isRegistrtion
          }
    default: {
      return state
    }
  }
};

export const setRegistrationErrorAC = (error: string) => {
    return {
        type: 'SET-ERROR',
        payload: {error}
    } as const
}

export const isRegistrationAC = (isRegistrtion: string) => {
    return {
        type: 'IS-REGISTRATION',
        payload: {isRegistrtion}
    } as const
}



export const addUserTC = (email: string, password:string) => (dispatch: Dispatch) => {
  registrationAPI.addUser(email, password)
      .then( (res) => {
          dispatch(isRegistrationAC(res.statusText))
      })
      .catch( error => {
          dispatch(setRegistrationErrorAC(error.response.data.error))
      }
  )
}

export type StateRegistrationReducerType = {
    error: string | null,
    isRegistrtion: string | null,
}

// type AddUserActionType = ReturnType<typeof addUserAC>
type SetRegistrationErrorActionType = ReturnType<typeof setRegistrationErrorAC>
type IsRegistrationACActionType = ReturnType<typeof isRegistrationAC>
type ActionType = SetRegistrationErrorActionType | IsRegistrationACActionType

export default  registrationReducer