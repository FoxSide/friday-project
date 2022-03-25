import {applyMiddleware, combineReducers, createStore} from "redux";
import {questionReducer} from "../a2-reducers/question-reduser";
import loginReducer, {LoginActionsType} from "../a2-reducers/login-reducer";
import registrationReducer, {RegistrationActionType} from "../a2-reducers/registration-reducer";
import profileReducer, {ProfileReducerActionsType} from "../a2-reducers/profile-reducer";
import errorReducer, {ErrorActionType} from "../a2-reducers/error-reducer";
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import {AppActionType, appReducer} from "../a2-reducers/app-reducer";
import {PasswordRecoveryActionType, passwordRecoveryReducer} from "../a2-reducers/password-recovery-reducer";
import {NewPasswordActionType, newPasswordReducer} from "../a2-reducers/new-password-reducer";
import {cardsReducer, CardsReducerActionsType} from "../a2-reducers/cards-reducer";
import {PackListActionsType, packListReducer} from "../a2-reducers/pack-list-reducer";

let rootReducer = combineReducers({
  login: loginReducer,
  registration: registrationReducer,
  profile: profileReducer,
  cards: cardsReducer,
  error: errorReducer,
  app: appReducer,
  passwordRecovery: passwordRecoveryReducer,
  newPassword: newPasswordReducer,
  packList: packListReducer,
  questionReducer: questionReducer
})


export let store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type AppRootStateType = ReturnType<typeof rootReducer>

// AppActionsType
export type AppRootActionsType = AppActionType
    | CardsReducerActionsType
    | ErrorActionType
    | LoginActionsType
    | NewPasswordActionType
    | PackListActionsType
    | PasswordRecoveryActionType
    | ProfileReducerActionsType
    | RegistrationActionType

//thunk type
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppRootActionsType>