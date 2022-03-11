import React, {useEffect} from 'react';
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

    useEffect(()=>{
        if(isRegistrtion ==true) {
            setTimeout(()=>{toLogin()}, 5000)
        }
    }, [isRegistrtion])

    const dispatch = useDispatch()

    const navigate = useNavigate()
    const toLogin = () => {
        navigate(path.login)
    }
    const schema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().min(7).required(),
        confirmPassword: yup.string().test('confirm password', 'Passwords is different!', function(value):any {
            return this.parent.password === value
        }),
    }).required()

    const {register, handleSubmit, formState: {errors, isValid}} = useForm<StateForm>({
        mode: "onChange",
        resolver: yupResolver(schema)
    })
    const onSubmit: SubmitHandler<StateForm> = (data) => {
        alert(`Your data ${data.email}, ${data.password}, ${data.confirmPassword}`)
        dispatch(addUserTC(data.email, data.password))
    }
    return (
        <div className={style.containerForm}>
            <div className={style.headerForm}>
                <h2>It-incubator</h2>
                <h3>Sing Up</h3>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={style.inputForm}>
                    <p>Email</p>
                    <input {...register('email')}
                           type='text'
                           required
                    />
                    {errors?.email && (<div style={{color: 'red'}}>{errors.email.message}</div>)}
                    <p>Password</p>
                    <input {...register('password')}
                           type='password'
                           required
                    />
                    {errors?.password && (<div style={{color: 'red'}}>{errors.password.message}</div>)}
                    <p>Confirm Password</p>
                    <input {...register('confirmPassword')}
                           type='password'
                           required
                    />
                    {errors?.confirmPassword && (<div style={{color: 'red'}}>{errors.confirmPassword.message}</div>)}
                </div>
                <div className={style.buttonForm}>
                    <button onClick={toLogin}>Cancel</button>
                    <button disabled={!isValid}>Register</button>
                </div>
            </form>
            {errorState && (<div style={{color: 'red'}}>Error: {errorState}</div>)}
            {isRegistrtion && (<div style={{color: 'green' }}>Account was: {isRegistrtion}</div>)}
        </div>
    );
};

type StateForm = {
    email: string
    password: string
    confirmPassword: string
}

export default Registration;
