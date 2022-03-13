import React, {useEffect} from 'react';
import {Routes, Route} from "react-router-dom";
import Login from "../../../n2-features/f1-auth/a1-login/Login";
import Registration from "../../../n2-features/f1-auth/a2-register/Registration";
import Profile from "../../../n2-features/f2-profile/Profile";
import ErrorPage from "../../../n2-features/f3-error-page/ErrorPage";
import PasswordRecovery from "../../../n2-features/f1-auth/a5-password-recovery/PasswordRecovery";
import NewPassword from "../../../n2-features/f1-auth/a6-new-password/NewPassword";
import Test from "../../../n2-features/f0-test/Test";
import ProfileEdit from '../../../n2-features/f2-profile/ProfileEdit';
import s from './routes.module.css'
import {useDispatch} from "react-redux";
import {setIntitalazedTC} from "../../m2-bll/a2-reducers/login-reducer";

export const path = {
  login: '/login',
  registration: '/registration',
  profile: '/profile',
  profileEdit: '/profile-edit',
  errorPage: '/404',
  passwordRecovery: '/password-recovery',
  newPassword: '/new-password',
  test: '/test'
}


const RoutesComponent = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setIntitalazedTC())
  }, [])

  return (
    <div className={s.wrapp}>
      <Routes>
        <Route path={path.login} element={<Login/>}/>
        <Route path={path.registration} element={<Registration/>}/>
        <Route path={path.profile} element={<Profile/>}/>
        <Route path={path.profileEdit} element={<ProfileEdit/>}/>
        <Route path={path.errorPage} element={<ErrorPage/>}/>
        <Route path={path.passwordRecovery} element={<PasswordRecovery/>}/>
        <Route path={path.newPassword} element={<NewPassword/>}/>
        <Route path={path.test} element={<Test/>}/>
      </Routes>
    </div>
  );
};

export default RoutesComponent;