import {authAPI, LoginParamsType} from "../../m3-dal/login-api";
import {Dispatch} from "redux";
import {setAppStatusAC, SetAppStatusActionType, setIsInitializedAC, SetIsInitializedActionType} from "./app-reducer";
import {setUserProfileData, SetUserProfileDataType} from "./profile-reducer";
import {setAppErrorAC, SetAppErrorType, setAppSuccessAC, SetAppSuccessType} from "./error-reducer";


type InitialStateType = {
  isLoggedIn: boolean
}
export type LoginActionsType =
  | SetUserProfileDataType
  | ReturnType<typeof setIsLoggedInAC>
  | SetIsInitializedActionType
  | SetAppErrorType
  | SetAppStatusActionType
  | SetAppSuccessType

export const initialState: InitialStateType = {
  isLoggedIn: false
}

const loginReducer = (state: InitialStateType = initialState, action: LoginActionsType) => {
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
export const setUserDataTC = (data: LoginParamsType) => (dispatch: Dispatch<LoginActionsType>) => {
  dispatch(setAppStatusAC("loading"))
  authAPI.login(data)
    .then(res => {
      dispatch(setIsLoggedInAC(true))
      dispatch(setUserProfileData(res.data))
      dispatch(setAppSuccessAC(res.statusText))
      dispatch(setAppErrorAC(null))
      dispatch(setAppStatusAC("succeeded"))

    })
    .catch(err => {
      dispatch(setAppStatusAC('failed'))
      dispatch(setAppErrorAC(err.response.data.error))
    })
    .finally(() => {
      dispatch(setIsInitializedAC(true))
      dispatch(setAppStatusAC('failed'))
    })
}

export const logOutTC = () => (dispatch: Dispatch<LoginActionsType>) => {
  dispatch(setAppStatusAC("loading"))
  authAPI.logOut()
    .then(res => {
      dispatch(setIsLoggedInAC(false))
      dispatch(setAppStatusAC("succeeded"))
      dispatch(setAppSuccessAC(res.statusText))
    })
    .catch(err => {
      dispatch(setAppErrorAC(err.response.data.error))
      dispatch(setAppStatusAC('failed'))
    })
}

export const authMeTC = () => (dispatch: Dispatch<LoginActionsType>) => {
  dispatch(setAppStatusAC("loading"))
  authAPI.me()
    .then(res => {
      dispatch(setIsLoggedInAC(true))
      dispatch(setUserProfileData(res.data))
      dispatch(setAppStatusAC("succeeded"))
      dispatch(setAppSuccessAC(res.statusText))
    })
    .catch(() => {
      // dispatch(setAppErrorAC(err.response.data.error))
      dispatch(setAppStatusAC('failed'))
    })
    .finally(() => {
      dispatch(setIsInitializedAC(true))
    })
}


export default loginReducer;