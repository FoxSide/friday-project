import React from 'react';
import {Dispatch} from "redux";
import {registrationAPI} from "../../m3-dal/registration-api";
import {setAppStatusAC, SetAppStatusActionType} from "./app-reducer";
import {setAppErrorAC, setAppSuccessAC} from "./error-reducer";


const initialState: StateRegistrationReducerType = {
    isRegistrtion: null,
}

const registrationReducer = (state: StateRegistrationReducerType = initialState, action: ActionType): StateRegistrationReducerType => {
  switch (action.type) {
      case "IS-REGISTRATION":
          return  {
              ...state,
              isRegistrtion: action.payload.isRegistrtion,
          }
    default: {
      return state
    }
  }
};

export const isRegistrationAC = (isRegistrtion: string) => {
    return {
        type: 'IS-REGISTRATION',
        payload: {isRegistrtion}
    } as const
}



export const addUserTC = (email: string, password:string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"))
    registrationAPI.addUser(email, password)
      .then( (res) => {
          dispatch(isRegistrationAC(res.statusText))
          dispatch(setAppSuccessAC(res.statusText))
          dispatch(setAppErrorAC(null))
          dispatch(setAppStatusAC("succeeded"))
      })
      .catch( error => {
          dispatch(setAppStatusAC('failed'))
          dispatch(setAppErrorAC(error.response.data.error))

      }
  )
}

export type StateRegistrationReducerType = {
    isRegistrtion: string | null,
}

type IsRegistrationACActionType = ReturnType<typeof isRegistrationAC>
type ActionType = IsRegistrationACActionType

export default registrationReducer