import React from 'react';
import s from "./PasswordRecovery.module.css";
import {NavLink} from 'react-router-dom';
import * as yup from "yup";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useDispatch} from "react-redux";
import style from "../../a2-register/Registration.module.css";
import {RequestDataType} from "../../../../n1-main/m3-dal/recovery-api";
import {fromMessage, htmlMessage} from "../constants/recoveryPasswordRequest";

const PasswordRecovery = () => {
    const dispatch = useDispatch();
    const schema = yup.object({
        email: yup.string().email().required(),
    }).required()

    const {register, handleSubmit, formState: {errors, isValid}} = useForm<StateForm>({
        mode: "onChange",
        resolver: yupResolver(schema)
    })
    const onSubmit: SubmitHandler<StateForm> = (data) => {
        console.log(data.email)
        // dispatch(addUserTC(data.email))
    }

    return (
        <div className={s.passwordRecovery}>
            <span className={s.title}>It-incubator</span>
            <span className={s.subTitle}>Forgot your password?</span>
            <form className={s.passwordRecovery__form}
                  onSubmit={handleSubmit(onSubmit)}
            >
                <input className={s.inputEmail}
                       {...register('email')}
                       type='email'
                       required
                       placeholder='Email'
                />
                <div className={style.inputFormError}>{errors.email?.message}</div>
                <span className={s.enterEmail__text}>
                    Enter your email address and we will send you further instructions
                </span>
                <button className={s.sendInstructions__button}
                        type={'submit'}
                        disabled={!isValid}
                >
                    Send Instructions
                </button>
            </form>
            <div className={s.rememberPassword__block}>
                <span className={s.rememberPassword__text}>Did you remember your password?</span>
                <NavLink to={'/login'} className={s.tryLoggingIn__button}>Try logging in</NavLink>
            </div>
        </div>
    );
};

type StateForm = {
    email: string;
}

export default PasswordRecovery;

/*
{
    email: "nya@nya.nya", // кому восстанавливать пароль
    from: "test-front-admin <ai73a@yandex.by>",
    // можно указать разработчика фронта
    message: `<div style="background-color: lime; padding: 15px">
                password recovery link:
                <a href='http://localhost:3000/#/set-new-password/$token$'>link</a>
              </div>`
              // хтмп-письмо, вместо $token$ бэк вставит токен
}*/

/*{
    info: "sent —ฅ/ᐠ.̫ .ᐟ\ฅ—"
    error: string;
}*/
