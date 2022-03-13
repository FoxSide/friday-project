import {authAPI, LoginParamsType} from "../../m3-dal/login-api";
import {Dispatch} from "redux";
import {setIsInitializedAC, SetIsInitializedActionType} from "./app-reducer";
import {setUserProfileData, SetUserProfileDataType} from "./profile-reducer";

type InitialStateType = {
  isLoggedIn: boolean
}
type ActionsType =
  | SetUserProfileDataType
  | ReturnType<typeof setIsLoggedInAC>
  | SetIsInitializedActionType
export type TNullable<T> = T | null | undefined

export const initialState: InitialStateType = {
  isLoggedIn: false
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
      alert('Ошибка')
      console.log(err)
    })
    .finally(() => {
      dispatch(setIsInitializedAC(true))
    })
}

export const logOutTC = () => (dispatch: Dispatch<ActionsType>) => {
  authAPI.logOut()
    .then(res => {
      dispatch(setIsLoggedInAC(false))
    })
    .catch(err => {
      alert(err)
    })
}

export const setIntitalazedTC = () => (dispatch: Dispatch<ActionsType>) => {
  authAPI.me()
    .then(res => {
      dispatch(setIsLoggedInAC(true))
      dispatch(setUserProfileData(res.data))
    })
}

export const setIsLoggedInTC = () => (dispatch: Dispatch<ActionsType>) => {
  authAPI.me()
    .then(res => {
      dispatch(setIsLoggedInAC(true))
    })
}


export default loginReducer;