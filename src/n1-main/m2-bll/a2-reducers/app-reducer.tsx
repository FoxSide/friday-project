import React from 'react';

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

type initialStateType = {
  status: RequestStatusType,
  isInitialized: boolean
}

const initialState = {
  status: 'idle' as RequestStatusType,
  isInitialized: false,
}

export const appReducer = (state: initialStateType = initialState, action: AppActionType): initialStateType => {
  switch (action.type) {
    case "APP/SET_STATUS":
      return {...state, status: action.status}
    case "APP/SET_INITIALIZED":
      return { ...state, isInitialized: action.isInitialized}
    default: {
      return state
    }
  }
};

export type AppActionType = SetAppStatusActionType | SetIsInitializedActionType

export const setAppStatusAC = (status:RequestStatusType) => {
  return {
    type: 'APP/SET_STATUS',
    status
  } as const
}

export const setIsInitializedAC = (isInitialized: boolean) => {
  return {
    type: 'APP/SET_INITIALIZED',
    isInitialized
  } as const
}

export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetIsInitializedActionType = ReturnType<typeof setIsInitializedAC>

