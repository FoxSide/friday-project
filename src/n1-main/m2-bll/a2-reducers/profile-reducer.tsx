import {profileAPI, UpdateUserResponseType} from '../../m3-dal/profile-api';
import {Dispatch} from "redux";
import {setAppStatusAC, SetAppStatusActionType} from "./app-reducer";
import {setAppErrorAC, SetAppErrorType, SetAppSuccessType} from "./error-reducer";

const initialState: TNullable<UserProfileStateType> = null
const profileReducer = (state: TNullable<UserProfileStateType> = initialState, action: ProfileReducerActionsType) => {

    switch (action.type) {
        case 'SET_USER_PROFILE_DATA':
            return {...state, ...action.data}
        case 'SET_CHANGE_USER_DATA':
            return {
                ...state, ...action.data.updatedUser,
                error: action.data.error || state?.error
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
export const updateUserProfileData = (name: string, avatar: string) => (dispatch: Dispatch<ProfileReducerActionsType>) => {
    dispatch(setAppStatusAC("loading"))
    profileAPI.updateUserData(name, avatar)
        .then(res => {
            dispatch(setChangeUserData(res.data))
            dispatch(setAppStatusAC("succeeded"))
            dispatch(setAppErrorAC(null))
        }).catch(err => {
        dispatch(setAppStatusAC('failed'))
        dispatch(setAppErrorAC(err.response.data.error))
    })
}

//type
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
export type ProfileReducerActionsType = ReturnType<typeof setChangeUserData>
    | SetUserProfileDataType
    | SetAppErrorType
    | SetAppStatusActionType
    | SetAppSuccessType

export type SetUserProfileDataType = {
    type: 'SET_USER_PROFILE_DATA'
    data: UserProfileStateType
}

export default profileReducer;

