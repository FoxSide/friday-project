import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Navigate, useNavigate} from "react-router-dom";
import {AppRootStateType} from "../../n1-main/m2-bll/a1-redux-store/store";
import s from './Profile.module.css'
import noAvatar from '../f2-profile/ProfileImg/noAvatar.png'
import {TNullable, UserProfileStateType} from "../../n1-main/m2-bll/a2-reducers/profile-reducer";
import {logOutTC} from "../../n1-main/m2-bll/a2-reducers/login-reducer";
import {Preloader} from "../../n1-main/m1-ui/common/preloader/Preloader";
import {ItemPacks} from "../packsList/PackListTable/ItemPacks/ItemPacks";
import {getPacksTC, PackListStateType, setIsMyPacks} from "../../n1-main/m2-bll/a2-reducers/pack-list-reducer";
import {DoubleRange} from '../../n1-main/m1-ui/common/doubleRange/DoubleRange';
import {PaginationBlock} from "../f4-pack/Pack/PaginationBlock/PaginationBlock";
import {SearchInput} from "../f4-pack/Pack/SearchInput/SearchInput";

const Profile = () => {
    const {
        cardPacks
    } = useSelector<AppRootStateType, PackListStateType>(state => state.packList)
    const status = useSelector<AppRootStateType>(state => state.app.status)
    const user = useSelector<AppRootStateType, TNullable<UserProfileStateType>>(state => state.profile)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(setIsMyPacks(true))
        dispatch(getPacksTC())
    }, [])

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
                            <button onClick={logOutOnClickHandler}>logOut</button>
                        </div>
                    </div>
                    <div className={s.profileSetting}>
                        <DoubleRange maxCardsCount={60} minCardsCount={4} setRangeCadsInPacksCallBack={() => {
                        }}/>
                    </div>

                </div>
                <div className={s.packListContainer}>
                    <div className={s.packListBlock}>
                        <div className={s.packListHeader}>
                            <h3>My pack list</h3>
                        </div>
                        <div className={s.packListSearch}>
                            <SearchInput className={s.searchInput} placeholder={"Search..."}/>
                        </div>
                        <div className={s.packListTable}>
                            <div className={s.packsHeader}>
                                <div className={s.packsBlockLarge}>Name</div>
                                <div className={s.packsBlockSmall}>Cards</div>
                                <div className={s.packsBlockMedium}>Last Updated</div>
                                <div className={s.packsBlockMedium}>Created by</div>
                                <div className={s.packsBlockLarge}>Actions</div>
                            </div>
                            <div>
                                {
                                    cardPacks.map(pack =>
                                        <ItemPacks
                                            id={pack._id}
                                            name={pack.name}
                                            cardsCount={pack.cardsCount}
                                            updated={pack.updated}
                                            userName={pack.user_name}
                                        />
                                    )
                                }
                            </div>
                        </div>
                        <div className={s.packListPagination}>
                            <PaginationBlock currentPage={3}
                                             pageSize={5}
                                             setCountItemsOnPageCallback={() => {
                                             }}
                                             setCurrentPageCallback={() => {
                                             }}
                                             totalCount={6}/>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default Profile;