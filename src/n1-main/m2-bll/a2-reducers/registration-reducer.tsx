import React from 'react';
import {Dispatch} from "redux";
import {registrationAPI} from "../../m3-dal/registration-api";


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
              isRegistrtion: action.payload.isRegistrtion,
              error: action.payload.error
          }
    default: {
      return state
    }
  }
};

export const setRegistrationErrorAC = (error: string | null) => {
    return {
        type: 'SET-ERROR',
        payload: {error}
    } as const
}

export const isRegistrationAC = (isRegistrtion: string, error: string | null) => {
    return {
        type: 'IS-REGISTRATION',
        payload: {isRegistrtion, error}
    } as const
}



export const addUserTC = (email: string, password:string) => (dispatch: Dispatch) => {
  registrationAPI.addUser(email, password)
      .then( (res) => {
          dispatch(isRegistrationAC(res.statusText, null))
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

export default registrationReducer