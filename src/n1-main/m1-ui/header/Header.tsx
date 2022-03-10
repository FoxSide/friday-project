import React from 'react';
import {NavLink} from "react-router-dom";
import {path} from '../routes/Routes'
import s from './Header.module.css'

const styleNav = (isActive: boolean) => isActive ? s.active : s.item

const Header = () => {
  return (
    <div className={s.container}>
      <NavLink to={path.login} className={({isActive}) => styleNav(isActive)}>Login</NavLink>
      <NavLink to={path.registration} className={({isActive}) => styleNav(isActive)}>Registration</NavLink>
      <NavLink to={path.profile} className={({isActive}) => styleNav(isActive)}>Profile</NavLink>
      <NavLink to={path.errorPage} className={({isActive}) => styleNav(isActive)}>Error 404</NavLink>
      <NavLink to={path.passwordRecovery} className={({isActive}) => styleNav(isActive)}>Password Recovery</NavLink>
      <NavLink to={path.newPassword} className={({isActive}) => styleNav(isActive)}>New Password</NavLink>
      <NavLink to={path.test} className={({isActive}) => styleNav(isActive)}>Test</NavLink>
    </div>
  );
};

export default Header;