import {authAPI, LoginParamsType} from "../../m3-dal/login-api";
import {Dispatch} from "redux";

type InitialStateType = typeof initialState
type ActionsType = ReturnType<typeof setIsLoggedInAC>

const initialState = {
  isLoggedIn: false
}

const loginReducer = (state: InitialStateType = initialState, action: ActionsType) => {
  switch (action.type) {
    case 'login/SET-IS-LOGGED-IN':
      return {...state, isLoggedIn: action.value}
    default:
      return state
  }
};

export const setIsLoggedInAC = (value: boolean) =>
  ({type: 'login/SET-IS-LOGGED-IN', value} as const)

export const setIsLoggedInTC = (data: LoginParamsType) => (dispatch: Dispatch<ActionsType>) => {
  authAPI.login(data)
    .then(res => {
      dispatch(setIsLoggedInAC(true))
      console.log(res.data)
    })
    .catch(err => {
      alert('Не верный логин/пароль')
      console.log(err)
    })
}

export default loginReducer;