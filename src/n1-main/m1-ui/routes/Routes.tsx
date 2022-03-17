import React, {useEffect} from 'react';
import {Routes, Route, Navigate} from "react-router-dom";
import Login from "../../../n2-features/f1-auth/a1-login/Login";
import Registration from "../../../n2-features/f1-auth/a2-register/Registration";
import Profile from "../../../n2-features/f2-profile/Profile";
import ErrorPage from "../../../n2-features/f3-error-page/ErrorPage";
import PasswordRecovery from "../../../n2-features/f1-auth/a5-password-recovery/passwordRecowery/PasswordRecovery";
import Test from "../../../n2-features/f0-test/Test";
import ProfileEdit from '../../../n2-features/f2-profile/ProfileEdit';
import s from './routes.module.css'
import {useDispatch, useSelector} from "react-redux";
import {setIntitalazedTC} from "../../m2-bll/a2-reducers/login-reducer";
import {CreateNewPassword} from "../../../n2-features/f1-auth/a6-createNewPassword/CreateNewPassword";
import {CheckEmail} from "../../../n2-features/f1-auth/a5-password-recovery/checkEmail/CheckEmail";
import {AppRootStateType} from "../../m2-bll/a1-redux-store/store";
import {PacksList} from "../../../n2-features/packsList/PacksList";

export const path = {
  login: '/login',
  registration: '/registration',
  profile: '/profile',
  profileEdit: '/profile-edit',
  errorPage: '/404',
  passwordRecovery: '/password-recovery',
  checkEmail: '/check-email',
  newPassword: '/new-password/:token',
  test: '/test',
  packList: '/pack-list',
}


const RoutesComponent = () => {
  const isLoggedIn = useSelector((state: AppRootStateType) => state.login.isLoggedIn)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setIntitalazedTC())
  }, [])

  return (
    <div className={s.wrapp}>
      <Routes>
        <Route path={'/'} element={!isLoggedIn ? <Navigate to={path.login}/> : <Navigate to={path.profile}/>}/>
        <Route path={path.login} element={<Login/>}/>
        <Route path={path.registration} element={<Registration/>}/>
        <Route path={path.profile} element={<Profile/>}/>
        <Route path={path.profileEdit} element={<ProfileEdit/>}/>
        <Route path={path.errorPage} element={<ErrorPage/>}/>
        <Route path={path.passwordRecovery} element={<PasswordRecovery/>}/>
        <Route path={path.checkEmail} element={<CheckEmail/>}/>
        <Route path={path.newPassword} element={<CreateNewPassword/>}/>
        <Route path={path.test} element={<Test/>}/>
        <Route path={path.packList} element={<PacksList/>}/>
      </Routes>
    </div>
  );
};

export default RoutesComponent;