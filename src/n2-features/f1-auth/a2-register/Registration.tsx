import React from 'react';
import {useNavigate} from "react-router-dom";
import {path} from "../../../n1-main/m1-ui/routes/Routes";
import {useDispatch, useSelector} from "react-redux";
import {addUserAC, StateRegistrationReducerType} from "../../../n1-main/m2-bll/a2-reducers/registration-reducer";
import {AppStoreType} from "../../../n1-main/m2-bll/a1-redux-store/store";
import {SubmitHandler, useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";


const Registration = () => {
    const emailState = useSelector<AppStoreType>(state => state.registration.email)
    const passwordState = useSelector<AppStoreType>(state => state.registration.password)
    const dispatch = useDispatch()

    const navigate = useNavigate()
    const toLogin = () => {
        navigate(path.login)
    }
    const schema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().min(3).required(),
        confirmPassword: yup.string().test('confirm password', 'Passwords is different!', function(value):any {
            return this.parent.password === value
        }),
    }).required()

    const {register, handleSubmit, formState: {errors, isValid}} = useForm<StateRegistrationReducerType & StateForm>({
        mode: "onBlur",
        resolver: yupResolver(schema)
    })
    const onSubmit: SubmitHandler<StateRegistrationReducerType & StateForm> = (data) => {
        alert(`Your data ${data.email}, ${data.password}, ${data.confirmPassword}`)
        dispatch(addUserAC(data.email, data.password))
    }

    return (
        <div>
            <div>
                <h2>It-incubator</h2>
                <h3>Sing Up</h3>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <p>Email</p>
                    <input {...register('email')}
                           type='text'
                           required
                    />
                    {errors?.email && (<div style={{color: 'red'}}>{errors.email.message}</div>)}
                    <p>Password</p>
                    <input {...register('password')}
                           type='text'
                           required
                    />
                    {errors?.password && (<div style={{color: 'red'}}>{errors.password.message}</div>)}
                    <p>Confirm Password</p>
                    <input {...register('confirmPassword')}
                           type='text'
                           required
                    />
                    {errors?.confirmPassword && (<div style={{color: 'red'}}>{errors.confirmPassword.message}</div>)}
                </div>
                <div>
                    <button onClick={toLogin}>Cancel</button>
                    <button disabled={!isValid}>Register</button>
                </div>
            </form>
            State: {emailState}, {passwordState}
        </div>
    );
};

type StateForm = {

    confirmPassword: string
}

export default Registration;
