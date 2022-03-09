import {applyMiddleware, combineReducers, createStore} from "redux";
import loginReducer from "../a2-reducers/login-reducer";
import {registrationReducer} from "../a2-reducers/registration-reducer";
import profileReducer from "../a2-reducers/profile-reducer";
import errorReducer from "../a2-reducers/error-reducer";
import passwordRecoveryReducer from "../a2-reducers/password-recovery-reducer";
import newPasswrodReducer from "../a2-reducers/new-password";
import thunk from "redux-thunk";

let rootReducer = combineReducers({
  login: loginReducer,
  registration: registrationReducer,
  profile: profileReducer,
  error: errorReducer,
  passwrdRecovery: passwordRecoveryReducer,
  newPassword: newPasswrodReducer
})

export type AppStoreType = ReturnType<typeof rootReducer>

export let store =createStore(rootReducer, applyMiddleware(thunk))

//@ts-ignore
window.store = store
