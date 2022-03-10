import React from 'react'
import s from './login.module.css'
import {useDispatch, useSelector} from "react-redux";
import {setIsLoggedInTC} from "../../../n1-main/m2-bll/a2-reducers/login-reducer";
import {useForm} from "react-hook-form";
import {LoginParamsType} from "../../../n1-main/m3-dal/login-api";
import {AppRootStateType} from "../../../n1-main/m2-bll/a1-redux-store/store";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import { Navigate, NavLink } from 'react-router-dom';

//ed

const schema = yup.object({
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup.string().required('Password is required'),
}).required();

const Login = () => {
  const {register, handleSubmit, formState: {errors}} = useForm<LoginParamsType>({
    resolver: yupResolver(schema)
  });
  const onSubmit = (data: LoginParamsType) => dispatch(setIsLoggedInTC(data));
  const dispatch = useDispatch()

  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)

  if (isLoggedIn) {
    return <Navigate to={'/profile'}/>
  }

  return (
    <div className={s.wrapp}>
      <div className={s.titleContainer}>
        <span className={s.titleText}>It-incubator</span>
        <span className={s.secondTitleText}>Sign In</span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={s.inputContainer}>
          <input className={s.input} {...register("email")} placeholder='Email'/>
          <div className={s.error}>{errors.email?.message}</div>
          <input className={s.input} {...register("password")} placeholder='Password' type={"password"}/>
          <div className={s.error}>{errors.password?.message}</div>
        </div>
        <div className={s.forgotContainer}>
          <div className={s.checkbox}>
            <input type="checkbox" {...register("rememberMe")}/>
            <div className={s.checkboxText}>Remember me</div>
          </div>
          <div>
            <NavLink to={'/password-recovery'} className={s.forgot}>Forgot Password</NavLink>
          </div>
        </div>
        <div className={s.buttonContainer}>
          <button className={s.button} type={'submit'}>Login</button>
        </div>
      </form>
      <div className={s.footerContainer}>
        <span className={s.footerText}>Don't have an account?</span>
        <NavLink to={'/registration'} className={s.footerButton}>Sign Up</NavLink>
      </div>
    </div>
  );
};

export default Login;