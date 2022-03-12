import React, {useEffect} from 'react';
import s from "./PasswordRecovery.module.css";
import {NavLink, useNavigate} from 'react-router-dom';
import * as yup from "yup";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useDispatch, useSelector} from "react-redux";
import {setIsEmailSendTC} from "../../../../n1-main/m2-bll/a2-reducers/password-recovery-reducer";
import {AppRootStateType} from "../../../../n1-main/m2-bll/a1-redux-store/store";
import {path} from "../../../../n1-main/m1-ui/routes/Routes";
import {Preloader} from "../../../../n1-main/m1-ui/common/preloader/Preloader";

const PasswordRecovery = () => {
    const isLoading = useSelector<AppRootStateType, boolean>(state => state.passwordRecovery.isLoading);
    const error = useSelector<AppRootStateType, string>(state => state.passwordRecovery.error);
    const isEmailSend = useSelector<AppRootStateType, boolean>(state => state.passwordRecovery.isEmailSend);
    const dispatch = useDispatch();

    const schema = yup.object({
        email: yup.string().email().required(),
    }).required();

    const {register, handleSubmit, formState: {errors, isValid}} = useForm<StateForm>({
        mode: "onChange",
        resolver: yupResolver(schema),
    })
    const onSubmit: SubmitHandler<StateForm> = (data) => {
        dispatch(setIsEmailSendTC(data.email));
    }

    const navigate = useNavigate();
    const toCheckEmail = () => {
        navigate(path.checkEmail);
    }

    useEffect(() => {
        if (isEmailSend) {
            toCheckEmail();
        }
    }, [isEmailSend]);
    return (
            <div className={s.passwordRecovery}>
                { isLoading && <Preloader/> }
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
                    <div className={s.inputFormError}>{errors.email?.message || error}</div>
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
