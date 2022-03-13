import {authAPI, LoginParamsType} from "../../m3-dal/login-api";
import {Dispatch} from "redux";
import {setUserProfileData, SetUserProfileDataType} from "./profile-reducer";
import {setInfoAC, SetInfoActionType} from "./error-reducer";
//fix
type InitialStateType = {
    isLoggedIn: boolean
}
type ActionsType = ReturnType<typeof setIsLoggedInAC> | SetUserProfileDataType | SetInfoActionType

export const initialState: InitialStateType = {
    isLoggedIn: false,
}

const loginReducer = (state: InitialStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'LOGIN/SET_IS_LOGGED_IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
};

//action
export const setIsLoggedInAC = (value: boolean) => {
    return {
        type: 'LOGIN/SET_IS_LOGGED_IN',
        value
    } as const
}

//thunk
export const setUserDataTC = (data: LoginParamsType) => (dispatch: Dispatch<ActionsType>) => {
    authAPI.login(data)
        .then(res => {
            dispatch(setIsLoggedInAC(true))
            dispatch(setUserProfileData(res.data))
        })
        .catch(err => {
            alert('Не верный логин/пароль')
            console.log(err)
        })
}

export const logOutTC = () => (dispatch: Dispatch<ActionsType>) => {
    authAPI.logOut()
        .then(res => {
            dispatch(setIsLoggedInAC(false))
            dispatch(setInfoAC(res.data.info))
        })
        .catch(err => {
            alert(err)
        })
}

export default loginReducer;