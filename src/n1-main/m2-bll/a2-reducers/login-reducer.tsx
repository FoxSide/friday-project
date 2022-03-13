import {authAPI, LoginParamsType} from "../../m3-dal/login-api";
import {Dispatch} from "redux";

type InitialStateType = {
  isLoggedIn: boolean
  userData: TNullable<UserProfileStateType>
}
type ActionsType = ReturnType<typeof setUserDataAC> | ReturnType<typeof setIsLoggedInAC>
export type TNullable<T> = T | null | undefined

export const initialState: InitialStateType = {
  isLoggedIn: false,
  userData:  null
}

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



const loginReducer = (state: InitialStateType = initialState, action: ActionsType) => {
  switch (action.type) {
    case 'LOGIN/SET_IS_LOGGED_IN':
      return {...state, isLoggedIn: action.value}
    case 'LOGIN/SET_USER_DATA':
      return {...state, userData: action.data}
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

export const setUserDataAC = (data: UserProfileStateType) => {
  return {
    type: 'LOGIN/SET_USER_DATA',
    data
  } as const
}

//thunk
export const setUserDataTC = (data: LoginParamsType) => (dispatch: Dispatch<ActionsType>) => {
  authAPI.login(data)
    .then(res => {
      dispatch(setIsLoggedInAC(true))
      dispatch(setUserDataAC(res.data))
    })
    .catch(err => {
      alert('Ошибка')
      console.log(err)
    })
}

export const setIsLoggedInTC = () => (dispatch: Dispatch<ActionsType>) => {
  authAPI.me()
    .then(res => {
      dispatch(setIsLoggedInAC(true))
    })
}


export default loginReducer;