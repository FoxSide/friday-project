import React from 'react';

type StateErrorType = {
    error: string | null,

}

const initialState = {
    error: null as string | null,
}


const errorReducer = (state: StateErrorType = initialState, action: ActionType): StateErrorType => {
    switch (action.type) {
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default: {
            return state
        }
    }
};

export const setAppErrorAC = (error: string | null) => {
    return {
        type: 'APP/SET-ERROR',
        error
    } as const
}

export type SetAppErrorType = ReturnType<typeof setAppErrorAC>

type ActionType = SetAppErrorType


export default errorReducer;