import React from 'react';

type StateType = {
    info: string
    error: string
}
type ActionType = SetInfoActionType
export type SetInfoActionType = ReturnType<typeof setInfoAC>

const initialState = {
    info: '',
    error: ''
}
const errorReducer = (state: StateType = initialState, action: ActionType) => {
    switch (action.type) {
        case "error/SET_INFO":
            return {...state, info: action.infoMassage}
        default: {
            return state
        }
    }
};

//action
export const setInfoAC = (infoMassage: string) => {
    return {
        type: 'error/SET_INFO',
        infoMassage
    } as const
}

export default errorReducer;