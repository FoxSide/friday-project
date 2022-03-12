import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Navigate, useNavigate} from "react-router-dom";
import {AppRootStateType} from "../../n1-main/m2-bll/a1-redux-store/store";
import s from './ProfileEdit.module.css'
import noAvatar from '../f2-profile/ProfileImg/noAvatar.png'
import {TNullable, UserProfileStateType} from "../../n1-main/m2-bll/a2-reducers/login-reducer";

const Profile = () => {
    const avatar = useSelector<AppRootStateType, TNullable<string>>(state => state.login.userData?.avatar)
    const user = useSelector<AppRootStateType, TNullable<UserProfileStateType>>(state => state.login.userData)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // useEffect(() => {
    //     dispatch(getUserProfileData())
    // }, [])

if(!isLoggedIn) {
    return <Navigate to={'/login'}/>
}

const onEditProfileClickHandler = () => {
    navigate('/profile-edit')
}
    return (
        <div>
            <div>
                 <img className={s.avatar} src={avatar || noAvatar} alt="avatar"/>
            </div>
            <div>{user?.name}</div>
            <div>{user?._id}</div>
            <button onClick={onEditProfileClickHandler}>edit profile</button>
        </div>
    );
};

export default Profile;