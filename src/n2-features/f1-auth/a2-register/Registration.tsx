import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {path} from "../../../n1-main/m1-ui/routes/Routes";
import {useDispatch, useSelector} from "react-redux";
import {
    addUserTC,
} from "../../../n1-main/m2-bll/a2-reducers/registration-reducer";
import {AppRootStateType} from "../../../n1-main/m2-bll/a1-redux-store/store";
import {SubmitHandler, useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import style from './Registration.module.css'


const Registration = () => {
    const errorState = useSelector<AppRootStateType>(state => state.registration.error)
    const isRegistrtion = useSelector<AppRootStateType>(state => state.registration.isRegistrtion)

    let [isType, setIsType] = useState(true)

    useEffect(() => {
        if (isRegistrtion == "Created") {
            setTimeout(() => {
                toLogin()
            }, 5000)
        }
    }, [isRegistrtion])

    const dispatch = useDispatch()

    const navigate = useNavigate()
    const toLogin = () => {
        navigate(path.login)
    }
    const schema = yup.object({
        email: yup.string().email().required(),
        password: yup.string().min(7).required(),
        confirmPassword: yup.string().test('confirm password', 'Passwords is different!', function (value): any {
            return this.parent.password === value
        }).required(),
    }).required()

    const {register, handleSubmit, formState: {errors, isValid}} = useForm<StateForm>({
        mode: "onChange",
        resolver: yupResolver(schema)
    })
    const onSubmit: SubmitHandler<StateForm> = (data) => {
        dispatch(addUserTC(data.email, data.password))
        console.log(isRegistrtion)
    }
    const toggleTypeInput = () => {
        setIsType(isType = !isType)
    }
    return (
        <div className={style.containerForm}>
            <div className={style.headerForm}>
                <h2>It-incubator</h2>
                <h3>Sign Up</h3>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={style.inputForm}>
                    <input {...register('email')}
                           type='text'
                           required
                           placeholder='Email*'

                    />
                    <div className={style.inputFormError}>{errors.email?.message}</div>
                    <input {...register('password')}
                        // type='password'
                           type={isType ? "password" : "text"}
                           required
                           placeholder='Password*'

                    />
                    <svg className={style.eyeOne} onClick={toggleTypeInput} xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                         viewBox="0 0 24 24">
                        <path
                            d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z"/>
                    </svg>
                    <div className={style.inputFormError}>{errors.password?.message}</div>
                    <input {...register('confirmPassword')}
                           type={isType ? "password" : "text"}
                           required
                           placeholder='Confirm Password*'
                    />
                    <svg className={style.eyeTwo} onClick={toggleTypeInput} xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                         viewBox="0 0 24 24">
                        <path
                            d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z"/>
                    </svg>
                    <div className={style.inputFormError}>{errors.confirmPassword?.message}</div>
                </div>
                <div className={style.buttonForm}>
                    <button onClick={toLogin}>Cancel</button>
                    <button disabled={!isValid}>Register</button>
                </div>
            </form>
            {errorState && (<div className={style.errorForm}>Error: {errorState}</div>)}
            {isRegistrtion && (
                <div className={style.successForm}>Account was: {isRegistrtion}. Redirecting to Login page...</div>)}
        </div>
    );
};

type StateForm = {
    email: string
    password: string
    confirmPassword: string
}

export default Registration;
