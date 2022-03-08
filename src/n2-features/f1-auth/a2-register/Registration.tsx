import React, {ChangeEvent, useState} from 'react';
import SuperInputText from "../../../n1-main/m1-ui/common/super-input-text/SuperInputText";
import SuperButton from "../../../n1-main/m1-ui/common/super-button/SuperButton";
import {useNavigate} from "react-router-dom";
import {path} from "../../../n1-main/m1-ui/routes/Routes";
import {useDispatch, useSelector} from "react-redux";
import {addUserAC} from "../../../n1-main/m2-bll/a2-reducers/registration-reducer";
import {AppStoreType} from "../../../n1-main/m2-bll/a1-redux-store/store";

const Registration = () => {
    const emailState = useSelector<AppStoreType>(state => state.registration.email)
    const passwordState = useSelector<AppStoreType>(state => state.registration.password)
    const dispatch = useDispatch()

    const navigate = useNavigate()

    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [confirmPassword, setConfirmPassword] = useState('');

    const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    }
    const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
    }
    const onChangeConfirmPassword = (e: ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.currentTarget.value)
    }
    const toLogin = () => {
        navigate(path.login)
    }

    const addNewUser = () => {
        dispatch(addUserAC(email, password))
    }

    return (
        <div>
            <div>
                <h2>It-incubator</h2>
                <h3>Sing Up</h3>
            </div>
            <div>
                <p>Email</p>
                <SuperInputText
                    onChange={onChangeEmail}
                    value={email}
                />
                <p>Password</p>
                <SuperInputText
                    onChange={onChangePassword}
                    value={password}
                />
                <p>Confirm Password</p>
                <SuperInputText
                    onChange={onChangeConfirmPassword}
                    value={confirmPassword}
                    error={!!password && !!confirmPassword && password != confirmPassword ? 'The password is different!' : ''}
                />
            </div>
            <div>
                <SuperButton onClick={toLogin}>Cancel</SuperButton>
                <SuperButton onClick={addNewUser}>Register</SuperButton>
            </div>
            State: {emailState}, {passwordState}
        </div>
    );
};

export default Registration;