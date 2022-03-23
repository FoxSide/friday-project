import React from 'react';

type StateErrorType = {
    error: string | null,
    success: string | null,

}

const initialState = {
    error: null as string | null,
    success: null as string | null,
}


const errorReducer = (state: StateErrorType = initialState, action: ErrorActionType): StateErrorType => {
    switch (action.type) {
        case 'ERROR/SET-ERROR':
            return {...state, error: action.error}
        case 'ERROR/SET-SUCCESS':
            return {...state, success: action.success}
        default: {
            return state
        }
    }
};

export const setAppErrorAC = (error: string | null) => {
    return {
        type: 'ERROR/SET-ERROR',
        error
    } as const
}

export type SetAppErrorType = ReturnType<typeof setAppErrorAC>

export const setAppSuccessAC = (success: string | null) => {
    return {
        type: 'ERROR/SET-SUCCESS',
        success
    } as const
}

export type SetAppSuccessType = ReturnType<typeof setAppSuccessAC>

export type ErrorActionType = SetAppErrorType | SetAppSuccessType


export default errorReducer;