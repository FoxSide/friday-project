import React from 'react';
import s from './App.module.css';
import {HashRouter} from "react-router-dom";
import Header from "./header/Header";
import RoutesComponent from "./routes/Routes";

const App = () => {


  return (
  <div className={s.app}>
    <HashRouter>
      <Header/>
      <RoutesComponent/>
    </HashRouter>
  </div>
  );
}

export default App;
