import React from 'react';


const initialState: StateRegistrationReducerType = {
  email: '',
  password: '',
}

export const registrationReducer = (state: StateRegistrationReducerType = initialState, action: ActionType): StateRegistrationReducerType => {
  switch (action.type) {
    case "ADD-USER":
      console.log(state)
      return {
        ...state,
        ...action.payload,
      }
    default: {
      return state
    }
  }
};


export const addUserAC = (email: string, password:string) => {
 return {
   type: 'ADD-USER',
   payload: {email, password},
 } as const
}

export type StateRegistrationReducerType = {
  email: string
  password: string
}

type AddUserActionType = ReturnType<typeof addUserAC>
type ActionType = AddUserActionType