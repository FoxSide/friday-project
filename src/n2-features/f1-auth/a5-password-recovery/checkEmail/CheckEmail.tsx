import React, {useEffect} from 'react';
import s from "./CheckEmail.module.css";
import checkEmail from "./../images/checkEmail.png";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../../n1-main/m2-bll/a1-redux-store/store";
import {setIsEmailSendAC} from "../../../../n1-main/m2-bll/a2-reducers/password-recovery-reducer";

export const CheckEmail = () => {
    const dispatch = useDispatch();
    const email = useSelector<AppRootStateType, string>(state => state.passwordRecovery.email);
    const checkEmailText = `We’ve sent an Email with instructions to ${email}`;
    useEffect(() => {
        dispatch(setIsEmailSendAC(false, email));
    }, [])
    return (
        <div className={s.checkEmail}>
            <span className={s.title}>It-incubator</span>
            <img className={s.checkEmail__img} src={checkEmail} alt="checkEmail"/>
            <span className={s.checkEmail__text}>Check Email</span>
            <span className={s.checkEmail__subtext}>{checkEmailText}</span>
        </div>
    );
};