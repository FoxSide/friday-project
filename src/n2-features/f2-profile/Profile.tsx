import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Navigate, useNavigate} from "react-router-dom";
import {AppRootStateType} from "../../n1-main/m2-bll/a1-redux-store/store";
import {getUserProfileData, TNullable, UserProfileStateType} from "../../n1-main/m2-bll/a2-reducers/profile-reducer";
import s from './ProfileEdit.module.css'
import noAvatar from '../f2-profile/ProfileImg/noAvatar.png'

const Profile = () => {
    const avatar = useSelector<AppRootStateType, TNullable<string>>(state => state.profile?.avatar)
    const user = useSelector<AppRootStateType, TNullable<UserProfileStateType>>(state => state.profile)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const dispatch = useDispatch()
    const navigate = useNavigate()

 
    useEffect(() => {
        debugger
        dispatch(getUserProfileData())
    }, [])

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
            <div>description</div>
            <button onClick={onEditProfileClickHandler}>edit profile</button>
        </div>
    );
};

export default Profile;