import React, { Dispatch } from 'react';
import { authAPI, profileAPI, UpdateUserResponseType } from '../../m3-dal/profile-api';


export type TNullable<T> = T | null | undefined
export type UserProfileStateType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number; // количество колод
    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту
    rememberMe: boolean;
    error?: string;
}

type ProfileReducerActionsType = ReturnType<typeof setUserProfileData>
    | ReturnType<typeof setChangeUserData>

const initialState: TNullable<UserProfileStateType> = {
    _id: 'string',
    email: 'string',
    name: 'string',
    avatar: 'string',
    publicCardPacksCount: 34, // количество колод
    created: new Date(),
    updated: new Date(),
    isAdmin: false,
    verified: false, // подтвердил ли почту
    rememberMe: false,
    error: 'sfsdf',
}

const profileReducer = (state: TNullable<UserProfileStateType> = initialState, action: ProfileReducerActionsType) => {
    switch (action.type) {
        case 'SET_USER_PROFILE_DATA':
            return { ...state, ...action.payload }
        case 'SET_CHANGE_USER_DATA':
            return { ...state, ...action.payload.updateUser, error: action.payload.error ? action.payload.error : state?.error }
        default: {
            return state
        }
    }
};

//action
export const setUserProfileData = (data: UserProfileStateType) => {
    return {
        type: 'SET_USER_PROFILE_DATA',
        payload: { ...data }
    } as const
}

export const setChangeUserData = (data: UpdateUserResponseType) => {
    return {
        type: 'SET_CHANGE_USER_DATA',
        payload: { ...data }
    } as const
}

//thunk
export const getUserProfileData = () => (dispatch: Dispatch<ProfileReducerActionsType>) => {
    authAPI.me().then(res => {
        debugger
        dispatch(setUserProfileData(res.data.data))
    }).catch(err => {
        debugger
        console.log(err)
    })
}

export const updateUserProfileData = (name: string, avatar: string) => (dispatch: Dispatch<ProfileReducerActionsType>) => {
    profileAPI.updateUserData(name, avatar)
    .then(res=>{
        dispatch(setChangeUserData(res.data.data))
    }).catch(err=>{
        console.log(err);
        
    })
} 


export default profileReducer;

