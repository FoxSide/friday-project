import React from 'react';


const initialState: StateType = {
  email: '',
  password: '',
}

export const registrationReducer = (state: StateType = initialState, action: ActionType): StateType => {
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

type StateType = {
  email: string | null
  password: string | null
}

type AddUserActionType = ReturnType<typeof addUserAC>
type ActionType = AddUserActionType