import {applyMiddleware, combineReducers, createStore} from "redux";
import loginReducer from "../a2-reducers/login-reducer";
import registrationReducer from "../a2-reducers/registration-reducer";
import profileReducer from "../a2-reducers/profile-reducer";
import errorReducer from "../a2-reducers/error-reducer";
import thunkMiddleware from "redux-thunk";
import {appReducer} from "../a2-reducers/app-reducer";
import {passwordRecoveryReducer} from "../a2-reducers/password-recovery-reducer";
import {newPasswordReducer} from "../a2-reducers/new-password-reducer";

let rootReducer = combineReducers({
  login: loginReducer,
  registration: registrationReducer,
  profile: profileReducer,
  error: errorReducer,
  app: appReducer,
  passwordRecovery: passwordRecoveryReducer,
  newPassword: newPasswordReducer,
})



export let store =createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type AppRootStateType = ReturnType<typeof rootReducer>