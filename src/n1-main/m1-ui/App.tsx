import React from 'react';
import s from './App.module.css';
import {HashRouter, Navigate} from "react-router-dom";
import Header from "./header/Header";
import RoutesComponent from "./routes/Routes";
import {AppRootStateType} from "../m2-bll/a1-redux-store/store";
import { useSelector } from 'react-redux';
import {SvgSelector} from "./common/SvgSelector/SvgSelector";
import {ErrorMassage} from "./common/ErrorMassage/ErrorMassage";
import {SuccessMassage} from "./common/SuccessMassage/SuccessMassage";



const App = () => {
  const isLoggedIn = useSelector((state: AppRootStateType) => state.login.isLoggedIn)

  // const dispatch = useDispatch()
  // useEffect(() => {
  //   dispatch(initializeAppTC())
  // }, [])

  // if (!isInitialized) {
  //   return (
  //       <div className={s.app + ' ' + s.loader} >
  //       <SvgSelector id={'ballLoader'} />
  //       </div>
  //     )
  // }

  return (
  <div className={s.app}>
      <Header/>
      <RoutesComponent/>
      <ErrorMassage/>
      <SuccessMassage />
  </div>
  );
}

export default App;
