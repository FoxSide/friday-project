import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Navigate, useNavigate} from "react-router-dom";
import {AppRootStateType} from "../../n1-main/m2-bll/a1-redux-store/store";
import s from './Profile.module.css'
import noAvatar from '../f2-profile/ProfileImg/noAvatar.png'
import {TNullable, UserProfileStateType} from "../../n1-main/m2-bll/a2-reducers/profile-reducer";
import {logOutTC} from "../../n1-main/m2-bll/a2-reducers/login-reducer";
import {Preloader} from "../../n1-main/m1-ui/common/preloader/Preloader";
import {ItemPacks} from "../packsList/PackListTable/ItemPacks/ItemPacks";
import {
    cardPacksType,
    getPacksTC,
    PackListStateType, setCountItemsPacksOnPage,
    setCurrentPacksPage,
    setIsMyPacks, setSearchName, setSortPacksOnPage
} from "../../n1-main/m2-bll/a2-reducers/pack-list-reducer";
import {DoubleRange} from '../../n1-main/m1-ui/common/doubleRange/DoubleRange';
import {PaginationBlock} from "../f4-pack/Pack/PaginationBlock/PaginationBlock";
import {SearchInput} from "../f4-pack/Pack/SearchInput/SearchInput";
import {PackListTable} from "../packsList/PackListTable/PackListTable";
import {EModeType} from "../packsList/PacksList";

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
    }, [page, pageCount, isMyPacks, isLoggedIn, sortPacks])

    const onEditProfileClickHandler = () => {
        navigate('/profile-edit')
    }

    const logOutOnClickHandler = () => {
        dispatch(logOutTC())
    }

    const setCurrentPacksPageCallBack = (currentPage: number) => dispatch(setCurrentPacksPage(currentPage))
    const setCountItemsPacksOnPageCallBack = (countItemsOnPage: number) => dispatch(setCountItemsPacksOnPage(countItemsOnPage))
    const setSortPacksOnPageCallBack = (sortPacks: string) => dispatch(setSortPacksOnPage(sortPacks))
    const setSearchNameCallBack = (searchName: string) => dispatch(setSearchName(searchName))

    const deleteMyPackCallBack = (name: string, packId: string) => {
        setShowModal(true)
        setMode(EModeType.DELETE_MODE)
        setRemovedPackData({name, packId})
    }

    const [removedPackData, setRemovedPackData] = useState({name: '', packId: ''})
    const [mode, setMode] = useState<EModeType | null>(null)
    const [showModal, setShowModal] = useState(false);

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
                            {/*<button onClick={logOutOnClickHandler}>logOut</button>*/}
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
                    deleteMyPackCallBack={deleteMyPackCallBack}
                    UserId={user?._id}
                    sortPacks={sortPacks}
                    setSearchNameCallBack={setSearchNameCallBack}
                />
                {/*<div className={s.packListContainer}>*/}
                {/*    <div className={s.packListBlock}>*/}
                {/*        <div className={s.packListHeader}>*/}
                {/*            <h3>My pack list</h3>*/}
                {/*        </div>*/}
                {/*        <div className={s.packListSearch}>*/}
                {/*            <SearchInput className={s.searchInput} placeholder={"Search..."}/>*/}
                {/*        </div>*/}
                {/*        <div className={s.packListTable}>*/}
                {/*            <div className={s.packsHeader}>*/}
                {/*                <div className={s.packsBlockLarge}>Name</div>*/}
                {/*                <div className={s.packsBlockSmall}>Cards</div>*/}
                {/*                <div className={s.packsBlockMedium}>Last Updated</div>*/}
                {/*                <div className={s.packsBlockMedium}>Created by</div>*/}
                {/*                <div className={s.packsBlockLarge}>Actions</div>*/}
                {/*            </div>*/}
                {/*            <div>*/}
                {/*                {*/}
                {/*                    cardPacks.map(pack =>*/}
                {/*                        <ItemPacks*/}
                {/*                            id={pack._id}*/}
                {/*                            name={pack.name}*/}
                {/*                            cardsCount={pack.cardsCount}*/}
                {/*                            updated={pack.updated}*/}
                {/*                            userName={pack.user_name}*/}
                {/*                        />*/}
                {/*                    )*/}
                {/*                }*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*        <div className={s.packListPagination}>*/}
                {/*            <PaginationBlock currentPage={page}*/}
                {/*                             pageSize={pageCount}*/}
                {/*                             setCountItemsOnPageCallback={setCountItemsPacksOnPageCallBack}*/}
                {/*                             setCurrentPageCallback={setCurrentPacksPageCallBack}*/}
                {/*                             totalCount={cardPacksTotalCount}/>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
    );
};

export default Profile;