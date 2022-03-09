import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { AppRootStateType } from "../../n1-main/m2-bll/a1-redux-store/store";
import { TNullable, updateUserProfileData, UserProfileStateType } from "../../n1-main/m2-bll/a2-reducers/profile-reducer";
import { profileAPI } from '../../n1-main/m3-dal/profile-api';



const ProfileEdit = () => {
    const avatar = useSelector<AppRootStateType, TNullable<string>>(state => state.profile?.avatar)
    const user = useSelector<AppRootStateType, TNullable<UserProfileStateType>>(state => state.profile)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onCancelClickHandler = () => {
        navigate('/profile')
    }
    const onSaveClickHandler = (name: string, avatar: string) => {
        dispatch(updateUserProfileData(name, avatar))
    }



    return (
        <form>
            <h3>Personal information</h3>
            <div>
                {avatar && <img src={avatar} alt="avatar" />}
            </div>
            <div>
                <span>NickName</span>
                <input type="text" placeholder='NickName' value={user?.name} />
                <span>e-mail</span>
                <input type="text" placeholder='E-mail' value={user?.email} />
            </div>
            <div>
                <button onClick={onCancelClickHandler}>Cancel</button>
                <button onClick={() => onSaveClickHandler('newName', 'newAva')}>Save</button>
            </div>
        </form>
    );
};


export default ProfileEdit;