import React, {useEffect} from 'react';
import s from "./CreateNewPassword.module.css";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import * as yup from "yup";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {path} from "../../../n1-main/m1-ui/routes/Routes";
import {setIsSetNewPasswordAC, setIsSetNewPasswordTC} from "../../../n1-main/m2-bll/a2-reducers/new-password-reducer";
import {AppRootStateType} from "../../../n1-main/m2-bll/a1-redux-store/store";
import {Preloader} from "../../../n1-main/m1-ui/common/preloader/Preloader";

export const CreateNewPassword = () => {
    const isLoading = useSelector<AppRootStateType, boolean>(state => state.passwordRecovery.isLoading);
    const isSetNewPassword = useSelector<AppRootStateType, boolean>(state => state.newPassword.isSetNewPassword);
    const error = useSelector<AppRootStateType, string>(state => state.newPassword.error)
    const dispatch = useDispatch();
    const {token} = useParams();

    const schema = yup.object({
        password: yup.string().min(7).required(),
    }).required();
    const {register, handleSubmit, formState: {errors, isValid}} = useForm<StateForm>({
        mode: "onChange",
        resolver: yupResolver(schema),
    })
    const onSubmit: SubmitHandler<StateForm> = (data) => {
        const password = data.password;
        token && dispatch(setIsSetNewPasswordTC(password, token));
    }

    const navigate = useNavigate();
    const toLogin = () => {
        navigate(path.login);
        dispatch(setIsSetNewPasswordAC(false));
    }

    useEffect(() => {
        if (isSetNewPassword) {
            toLogin();
        }
    }, [isSetNewPassword]);

    return (
        <div className={s.createNewPassword}>
            { isLoading && <Preloader/> }
            <span className={s.title}>It-incubator</span>
            <span className={s.subTitle}>Create new password</span>
            <form className={s.createNewPassword__form} onSubmit={handleSubmit(onSubmit)}>
                <input className={s.inputPassword}
                       {...register('password')}
                       type='password'
                       required
                       placeholder='Password'
                />
                <div className={s.inputFormError}>{errors.password?.message || error}</div>
                <span className={s.createNewPassword__text}>Create new password and we will send you further instructions to email</span>
                <button className={s.createNewPassword__button}
                        type={'submit'}
                        disabled={!isValid}
                >
                    Create new password
                </button>
            </form>
        </div>
    );
};

type StateForm = {
    password: string;
}