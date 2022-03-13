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
import {SvgSelector} from "../../../n1-main/m1-ui/common/SvgSelector/SvgSelector";
import {ErrorMassage} from "../../../n1-main/m1-ui/common/ErrorMassage/ErrorMassage";


const Registration = () => {
    const error = useSelector<AppRootStateType>(state => state.error.error)
    const isRegistrtion = useSelector<AppRootStateType>(state => state.registration.isRegistrtion)
    const status = useSelector<AppRootStateType>(state => state.app.status)

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
        <>
            {status === "loading" ? <div><SvgSelector id={'ballLoader'}/></div> :
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
                        <SvgSelector id={'Eye'} onClick={toggleTypeInput} className={style.eyeOne}/>
                        <div className={style.inputFormError}>{errors.password?.message}</div>
                        <input {...register('confirmPassword')}
                               type={isType ? "password" : "text"}
                               required
                               placeholder='Confirm Password*'
                        />
                        <SvgSelector id={'Eye'} onClick={toggleTypeInput} className={style.eyeTwo}/>
                        <div className={style.inputFormError}>{errors.confirmPassword?.message}</div>
                    </div>
                    <div className={style.buttonForm}>
                        <button onClick={toLogin}>Cancel</button>
                        <button disabled={!isValid}>Register</button>
                    </div>
                </form>
                {isRegistrtion && (
                    <div className={style.successForm}>Account was: {isRegistrtion}. Redirecting to Login
                        page...</div>)}
            </div>}
        </>
    );
};

type StateForm = {
    email: string
    password: string
    confirmPassword: string
}

export default Registration;
