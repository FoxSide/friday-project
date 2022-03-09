import React, {Dispatch} from 'react';
import {authAPI, profileAPI, UpdateUserResponseType} from '../../m3-dal/profile-api';


export type TNullable<T> = T | null | undefined
export type UserProfileStateType = {
    _id: string
    email: string
    name: string
    avatar?: string
    publicCardPacksCount: number
    created: Date
    updated: Date
    isAdmin: boolean
    verified: boolean
    rememberMe: boolean
    error?: string
}

type ProfileReducerActionsType = ReturnType<typeof setUserProfileData>
    | ReturnType<typeof setChangeUserData>

const initialState: TNullable<UserProfileStateType> = null

const profileReducer = (state: TNullable<UserProfileStateType> = initialState, action: ProfileReducerActionsType) => {
    switch (action.type) {
        case 'SET_USER_PROFILE_DATA':
            return {...state, ...action.data}
        case 'SET_CHANGE_USER_DATA':
            return {
                ...state, ...action.data.updateUser,
                error: action.data.error ? action.data.error : state?.error
            }
        default: {
            return state
        }
    }
};

//action
export const setUserProfileData = (data: UserProfileStateType) => {
    return {
        type: 'SET_USER_PROFILE_DATA',
        data
    } as const
}

export const setChangeUserData = (data: UpdateUserResponseType) => {
    return {
        type: 'SET_CHANGE_USER_DATA',
        data
    } as const
}

//thunk
export const getUserProfileData = () => (dispatch: Dispatch<ProfileReducerActionsType>) => {
    authAPI.me().then(res => {
        debugger
        dispatch(setUserProfileData(res.data))
    }).catch(err => {
        debugger
        console.log(err)
    })
}

export const updateUserProfileData = (name: string, avatar: string) => (dispatch: Dispatch<ProfileReducerActionsType>) => {
    profileAPI.updateUserData(name, avatar)
        .then(res => {
            dispatch(setChangeUserData(res.data))
        }).catch(err => {
        console.log(err);

    })
}


export default profileReducer;

