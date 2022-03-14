import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Navigate, useNavigate} from "react-router-dom";
import {AppRootStateType} from "../../n1-main/m2-bll/a1-redux-store/store";
import s from './ProfileEdit.module.css'
import noAvatar from '../f2-profile/ProfileImg/noAvatar.png'
import {TNullable, UserProfileStateType} from "../../n1-main/m2-bll/a2-reducers/profile-reducer";
import {logOutTC} from "../../n1-main/m2-bll/a2-reducers/login-reducer";
import {Preloader} from "../../n1-main/m1-ui/common/preloader/Preloader";

const Profile = () => {
    const status = useSelector<AppRootStateType>(state => state.app.status)
    const user = useSelector<AppRootStateType, TNullable<UserProfileStateType>>(state => state.profile)
    const userName = user?.name
    console.log(userName)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onEditProfileClickHandler = () => {
        navigate('/profile-edit')
    }

    const logOutOnClickHandler = () => {
        dispatch(logOutTC())
    }
    return (
        !isLoggedIn
            ? <Navigate to={'/login'}/>
            : <div>
                {status === "loading" && <Preloader/>}
                <div>
                    <img className={s.avatar} src={user?.avatar || noAvatar} alt="avatar"/>
                </div>
                <div>{user?.name}</div>
                <div>{user?._id}</div>
                <button onClick={onEditProfileClickHandler}>edit profile</button>
                <button onClick={logOutOnClickHandler}>logOut</button>
            </div>
    );
};

export default Profile;