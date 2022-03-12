import React from 'react';
import s from "./CheckEmail.module.css";
import checkEmail from "./../images/checkEmail.png";

export const CheckEmail = () => {
    return (
        <div className={s.checkEmail}>
            <span className={s.title}>It-incubator</span>
            <img className={s.checkEmail__img} src={checkEmail} alt="checkEmail"/>
            <span className={s.checkEmail__text}>Check Email</span>
            <span className={s.checkEmail__subtext}>We’ve sent an Email with instructions to example@mail.com</span>
        </div>
    );
};