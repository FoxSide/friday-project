import {combineReducers, createStore} from "redux";
import loginReducer from "../a2-reducers/login-reducer";
import registrationReducer from "../a2-reducers/registration-reducer";
import profileReducer from "../a2-reducers/profile-reducer";
import errorReducer from "../a2-reducers/error-reducer";
import passwordRecoveryReducer from "../a2-reducers/password-recovery-reducer";
import newPasswrodReducer from "../a2-reducers/new-password";

let rootReducer = combineReducers({
  login: loginReducer,
  registration: registrationReducer,
  profile: profileReducer,
  error: errorReducer,
  passwrdRecovery: passwordRecoveryReducer,
  newPassword: newPasswrodReducer
})

export let store =createStore(rootReducer)