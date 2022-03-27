import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Navigate, useNavigate} from "react-router-dom";
import {AppRootStateType} from "../../n1-main/m2-bll/a1-redux-store/store";
import s from './Profile.module.css'
import noAvatar from '../f2-profile/ProfileImg/noAvatar.png'
import {TNullable, UserProfileStateType} from "../../n1-main/m2-bll/a2-reducers/profile-reducer";
import {Preloader} from "../../n1-main/m1-ui/common/preloader/Preloader";
import {
    cardPacksType,
    getPacksTC,
    PackListStateType,
    setCountItemsPacksOnPage,
    setCurrentPacksPage,
    setIsMyPacks,
    setSearchName,
    setSortPacksOnPage
} from "../../n1-main/m2-bll/a2-reducers/pack-list-reducer";
import {PackListTable} from "../packsList/PackListTable/PackListTable";

const Profile = () => {
    const {
        page,
        pageCount,
        isMyPacks,
        maxCardsCount,
        minCardsCount,
        sortPacks,
        cardPacksTotalCount,
        maxFilter,
        minFilter,
        searchName,
    } = useSelector<AppRootStateType, PackListStateType>(state => state.packList)
    const packs = useSelector<AppRootStateType, cardPacksType[]>(state => state.packList.cardPacks)
    const status = useSelector<AppRootStateType>(state => state.app.status)
    const user = useSelector<AppRootStateType, TNullable<UserProfileStateType>>(state => state.profile)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(setIsMyPacks(true))
        dispatch(getPacksTC(user?._id))
    }, [page, pageCount, isLoggedIn, sortPacks])

    const onEditProfileClickHandler = () => {
        navigate('/profile-edit')
    }


    const setCurrentPacksPageCallBack = (currentPage: number) => dispatch(setCurrentPacksPage(currentPage))
    const setCountItemsPacksOnPageCallBack = (countItemsOnPage: number) => dispatch(setCountItemsPacksOnPage(countItemsOnPage))
    const setSortPacksOnPageCallBack = (sortPacks: string) => dispatch(setSortPacksOnPage(sortPacks))
    const setSearchNameCallBack = (searchName: string) => dispatch(setSearchName(searchName))


    return (
        !isLoggedIn
            ? <Navigate to={'/login'}/>
            : <div className={s.wrapp}>
                {status === "loading" && <Preloader/>}
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
                        </div>
                    </div>
                    <div className={s.profileSetting}>

                        {/*<DoubleRange maxCardsCount={60} minCardsCount={4} setRangeCadsInPacksCallBack={() => {*/}
                        {/*}}/>*/}

                    </div>

                </div>
                <PackListTable
                    title={'My pack list'}
                    addBlockToggle={false}
                    packs={packs}
                    setCurrentPacksPageCallBack={setCurrentPacksPageCallBack}
                    setCountItemsPacksOnPageCallBack={setCountItemsPacksOnPageCallBack}
                    setSortPacksOnPageCallBack={setSortPacksOnPageCallBack}
                    pageCount={pageCount}
                    page={page}
                    cardPacksTotalCount={cardPacksTotalCount}
                    UserId={user?._id}
                    sortPacks={sortPacks}
                    setSearchNameCallBack={setSearchNameCallBack}
                />
            </div>
    );
};

export default Profile;