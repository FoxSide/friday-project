import React from "react";
import s from './Header1.module.css'
import cardsImg from '../common/images/eye.png'
import profileImg from '../common/images/eye.png'
import logoutnImg from '../common/images/eye.png'
import {NavLink} from "react-router-dom";
import {path} from "../routes/Routes";
import {logOutTC} from "../../m2-bll/a2-reducers/login-reducer";
import {useDispatch} from "react-redux";

export const Header1 = () => {
  const dispatch = useDispatch()
  const logOutOnClickHandler = () => {
    dispatch(logOutTC())
  }
  return (
    <div className={s.wrapp}>
      <div className={s.title}>It-incubator</div>
      <div className={s.buttonContainer}>
        <NavLink to={path.packList} className={({isActive}) => isActive ? s.activeButton : s.button}>
          <img className={s.cardsImg} src={cardsImg} alt="cardsImg"/>
          <div>Packs list</div>
        </NavLink>
        <NavLink to={path.profile} className={({isActive}) => isActive ? s.activeButton : s.button}>
          <img className={s.profileImg} src={profileImg} alt="profileImg"/>
          <div>Profile</div>
        </NavLink>
      </div>
      <div className={s.logoutButttonContainer} onClick={logOutOnClickHandler}>
        <img className={s.logoutImg} src={logoutnImg} alt="logoutImg"/>
      </div>
    </div>
  )
}