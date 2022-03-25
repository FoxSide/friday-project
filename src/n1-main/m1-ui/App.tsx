import React, {useEffect, useState} from 'react';
import s from './App.module.css';
import RoutesComponent from "./routes/Routes";
import {AppRootStateType} from "../m2-bll/a1-redux-store/store";
import {useDispatch, useSelector} from 'react-redux';
import {ErrorMassage} from "./common/ErrorMassage/ErrorMassage";
import {SuccessMassage} from "./common/SuccessMassage/SuccessMassage";
import {Preloader} from "./common/preloader/Preloader";
import {authMeTC} from "../m2-bll/a2-reducers/login-reducer";
import {Header1} from "./header/Header1";


const App = () => {
  const isInitialized = useSelector((state: AppRootStateType) => state.app.isInitialized)
  const isLoggedIn = useSelector((state: AppRootStateType) => state.login.isLoggedIn)
  const dispatch = useDispatch()

  useEffect(() => {
      dispatch(authMeTC())
  }, [])

  return (
    <>
      {!isInitialized
        ? <Preloader/>
        : <div className={s.app}>
          {isLoggedIn && <Header1/>}
          <RoutesComponent/>
          <ErrorMassage/>
          <SuccessMassage/>
        </div>
      }
    </>
  );
}

export default App;
