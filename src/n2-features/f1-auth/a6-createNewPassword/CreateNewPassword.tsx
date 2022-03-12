import React from 'react';
import s from "./CreateNewPassword.module.css";

export const CreateNewPassword = () => {
    return (
        <div className={s.createNewPassword}>
            <span className={s.title}>It-incubator</span>
            <span className={s.subTitle}>Create new password</span>
            <form className={s.createNewPassword__form} onSubmit={() => {
            }}>
                <input className={s.inputPassword} placeholder='Password'/>
                <span className={s.createNewPassword__text}>Create new password and we will send you further instructions to email</span>
                <button className={s.createNewPassword__button} type={'submit'}>Create new password</button>
            </form>
        </div>
    );
};