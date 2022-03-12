import React from 'react';
import {Routes, Route} from "react-router-dom";
import Login from "../../../n2-features/f1-auth/a1-login/Login";
import Registration from "../../../n2-features/f1-auth/a2-register/Registration";
import Profile from "../../../n2-features/f2-profile/Profile";
import ErrorPage from "../../../n2-features/f3-error-page/ErrorPage";
import PasswordRecovery from "../../../n2-features/f1-auth/a5-password-recovery/passwordRecowery/PasswordRecovery";
import Test from "../../../n2-features/f0-test/Test";
import ProfileEdit from '../../../n2-features/f2-profile/ProfileEdit';
import s from './routes.module.css'
import {CreateNewPassword} from "../../../n2-features/f1-auth/a6-createNewPassword/CreateNewPassword";
import {CheckEmail} from "../../../n2-features/f1-auth/a5-password-recovery/checkEmail/CheckEmail";

export const path = {
  login: '/login',
  registration: '/registration',
  profile: '/profile',
  profileEdit: '/profile-edit',
  errorPage: '/404',
  passwordRecovery: '/password-recovery',
  checkEmail: '/check-email',
  newPassword: '/new-password/:token',
  test: '/test'
}

const RoutesComponent = () => {
  return (
    <div className={s.wrapp}>
      <Routes>
        <Route path={path.login} element={<Login/>}/>
        <Route path={path.registration} element={<Registration/>}/>
        <Route path={path.profile} element={<Profile/>}/>
        <Route path={path.profileEdit} element={<ProfileEdit/>}/>
        <Route path={path.errorPage} element={<ErrorPage/>}/>
        <Route path={path.passwordRecovery} element={<PasswordRecovery/>}/>
        <Route path={path.checkEmail} element={<CheckEmail/>}/>
        <Route path={path.newPassword} element={<CreateNewPassword/>}/>
        <Route path={path.test} element={<Test/>}/>
      </Routes>
    </div>
  );
};

export default RoutesComponent;