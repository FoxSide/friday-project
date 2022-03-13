import React from 'react';
import s from './App.module.css';
import {HashRouter} from "react-router-dom";
import Header from "./header/Header";
import RoutesComponent from "./routes/Routes";
import {AppRootStateType} from "../m2-bll/a1-redux-store/store";
import { useSelector } from 'react-redux';
import {SvgSelector} from "./common/SvgSelector/SvgSelector";
import {ErrorMassage} from "./common/ErrorMassage/ErrorMassage";



const App = () => {
  const isInitialized = useSelector<AppRootStateType>(state=> state.app.isInitialized)

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
  </div>
  );
}

export default App;
