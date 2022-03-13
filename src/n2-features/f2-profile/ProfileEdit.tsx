import React, {useEffect, useState} from 'react';
import {yupResolver} from '@hookform/resolvers/yup';
import s from './ProfileEdit.module.css'
import {useForm} from 'react-hook-form';
import {useDispatch, useSelector} from "react-redux";
import {Navigate, useNavigate} from 'react-router-dom';
import {AppRootStateType} from "../../n1-main/m2-bll/a1-redux-store/store";
// import {TNullable, updateUserProfileData, UserProfileStateType} from "../../n1-main/m2-bll/a2-reducers/profile-reducer";
import * as yup from "yup";
import photoBtnIcon from '../f2-profile/ProfileImg/PhotoBtn.png'
import noAvatar from '../f2-profile/ProfileImg/noAvatar.png'
import {TNullable, UserProfileStateType} from "../../n1-main/m2-bll/a2-reducers/login-reducer";
import {updateUserProfileData} from "../../n1-main/m2-bll/a2-reducers/profile-reducer";

const schema = yup.object({
  nickName: yup.string().required('nickName is required'),
}).required();

const ProfileEdit = () => {
  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
  const user = useSelector<AppRootStateType, TNullable<UserProfileStateType>>(state => state.login.userData)
  const [nickName, setNickName] = useState<string | undefined>(user?.name);
  const [avatar, setAvatar] = useState<string | undefined>(user?.avatar);
  const [upload, setUpload] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (editMode) {
      navigate('/profile')
    }
  }, [editMode])

  const onCancelClickHandler = () => {
    navigate('/profile')
  }

  const onClickUploadHandler = () => {
    setUpload(!upload)
  }

  const onSubmit = (data: OnSubmitDataType) => {
    setEditMode(true)
    dispatch(updateUserProfileData(data.nickName, data.avatar))
  };
  const {register, handleSubmit, formState: {errors}} = useForm<OnSubmitDataType>({
    resolver: yupResolver(schema)
  });

  return (
    <form className={s.wrapp} onSubmit={handleSubmit(onSubmit)}>
      <div className={s.titleContainer}>
        <span className={s.titleText}>Personal information</span>
        <img className={s.avatar} src={user?.avatar || noAvatar} alt="avatar"/>
        <div className={s.photoBtn} onClick={onClickUploadHandler}>
          <img src={photoBtnIcon}/>
        </div>
      </div>
      <div className={s.inputUrlContainer}>
        {upload && <input  {...register("avatar")} className={s.inputUrl} value={avatar} onChange={(e) => {
          setAvatar(e.currentTarget.value)
        }}/>}
      </div>

      <div className={s.inputContainer}>
        <span className={s.subTitle}>Nickname</span>
        <input className={s.input} {...register("nickName")} placeholder='Nickname' value={nickName}
               onChange={(e) => {
                 setNickName(e.currentTarget.value)
               }}/>
        <div className={s.error}>{errors.nickName?.message}</div>
        <span className={s.subTitle}>E-mail</span>
        <input className={s.input} value={user?.email} placeholder='E-mail' type={"text"}/>
      </div>
      <div className={s.buttonContainer}>
        <button className={s.buttonCancle} onClick={onCancelClickHandler}>Cancle</button>
        <button className={s.buttonSave} type={'submit'}>Save</button>
      </div>
    </form>
  );
};

type OnSubmitDataType = {
  nickName: string
  avatar: string
}

export default ProfileEdit;