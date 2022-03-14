import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Navigate, useNavigate} from "react-router-dom";
import {AppRootStateType} from "../../n1-main/m2-bll/a1-redux-store/store";
import s from './Profile.module.css'
import noAvatar from '../f2-profile/ProfileImg/noAvatar.png'
import {TNullable, UserProfileStateType} from "../../n1-main/m2-bll/a2-reducers/profile-reducer";
import {logOutTC} from "../../n1-main/m2-bll/a2-reducers/login-reducer";

const Profile = () => {

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
            : <div className={s.wrapp}>
                <div className={s.profileContainer}>
                    <div className={s.profile}>
                        <div className={s.profileAva}>
                            <div>
                                <img className={s.avatar} src={user?.avatar || noAvatar} alt="avatar"/>
                            </div>
                        </div>
                        <div className={s.profileDescription}>
                            <h3>{user?.name}</h3>
                            <p className={s.profileDescriptionText}>Front-end developer</p>
                        </div>
                        <div className={s.profileButton}>
                            <button onClick={onEditProfileClickHandler}>edit profile</button>
                            <button onClick={logOutOnClickHandler}>logOut</button>
                        </div>
                    </div>
                    <div className={s.profileSetting}>
                        <span>Number of cards</span>
                    </div>
                </div>
                <div className={s.packListContainer}>

                </div>

            </div>
    );
};

export default Profile;