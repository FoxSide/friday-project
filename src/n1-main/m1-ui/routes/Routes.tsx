import React from 'react';
import {Routes, Route} from "react-router-dom";
import Login from "../../../n2-features/f1-auth/a1-login/Login";
import Registration from "../../../n2-features/f1-auth/a2-register/Registration";
import Profile from "../../../n2-features/f2-profile/Profile";
import ErrorPage from "../../../n2-features/f3-error-page/ErrorPage";
import PasswordRecovery from "../../../n2-features/f1-auth/a5-password-recovery/PasswordRecovery";
import NewPassword from "../../../n2-features/f1-auth/a6-new-password/NewPassword";
import Test from "../../../n2-features/f0-test/Test";

export const path = {
  login: '/login',
  registration: '/registration',
  ptofile: '/profile',
  errorPage: '/404',
  passwordRecovery: '/password-recovery',
  newPassword: '/new-password',
  test: '/test'
}

const RoutesComponent = () => {
  return (
    <div style={{margin: '90px'}}>
      <Routes>
        <Route path={path.login} element={<Login/>}/>
        <Route path={path.registration} element={<Registration/>}/>
        <Route path={path.ptofile} element={<Profile/>}/>
        <Route path={path.errorPage} element={<ErrorPage/>}/>
        <Route path={path.passwordRecovery} element={<PasswordRecovery/>}/>
        <Route path={path.newPassword} element={<NewPassword/>}/>
        <Route path={path.test} element={<Test/>}/>
      </Routes>
    </div>
  );
};

export default RoutesComponent;