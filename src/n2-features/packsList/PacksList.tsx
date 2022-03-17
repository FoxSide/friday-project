import s from './PacksList.module.css'
import {DoubleRange} from "../../n1-main/m1-ui/common/doubleRange/DoubleRange";
import {SvgSelector} from "../../n1-main/m1-ui/common/SvgSelector/SvgSelector";
import {setPacksTC} from "../../n1-main/m2-bll/a2-reducers/pack-list-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../n1-main/m2-bll/a1-redux-store/store";
import React, {useEffect, useState} from "react";
import {packListCardPacks, packListResponseType} from "../../n1-main/m3-dal/packList-api";
import {useNavigate} from "react-router-dom";




export const PacksList = () => {
    const dispatch = useDispatch()
    const packs = useSelector<AppRootStateType, packListCardPacks[]>(state => state.packList.cardPacks)
    const userID = useSelector<AppRootStateType, string | undefined >(state => state.profile?._id)
    const cardPacksTotalCount = useSelector<AppRootStateType, number | null >(state => state.packList.cardPacksTotalCount)
    const pageCount = useSelector<AppRootStateType, number | null >(state => state.packList.pageCount)
    const page = useSelector<AppRootStateType, number | null >(state => state.packList.page)
    const maxCardsCount = useSelector<AppRootStateType, number | null >(state => state.packList.maxCardsCount)
    const minCardsCount = useSelector<AppRootStateType, number | null >(state => state.packList.minCardsCount)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const navigate = useNavigate()


    const [isMyPacks, setIsMyPacks] = useState<boolean>(false)
    const [pageNumber, setPageNumber] = useState<number>(1)
    const [setPage, setSetPage] = useState<number>(5)
    const [max, setMax] = useState<number | null>(maxCardsCount)
    const [min, setMin] = useState<number | null>(minCardsCount)

    console.log(min, max)
    console.log(minCardsCount, maxCardsCount)


    useEffect(() => {
         {
             if(!isLoggedIn) {
                 navigate('/login')
             } else {
                 dispatch(setPacksTC({page: pageNumber, pageCount: setPage,}))
             }
        }
    }, [])

    useEffect( ()=>{
        if (isMyPacks) {
            dispatch(setPacksTC({page: pageNumber, pageCount: setPage, user_id: userID }))
        } else {
            dispatch(setPacksTC({page: pageNumber, pageCount: setPage, }))
        }
    }, [isMyPacks])


    useEffect(() => {
        {
                dispatch(setPacksTC({page: pageNumber, pageCount: setPage,}))
        }
    }, [pageNumber, setPage])

    const changeWhosePacks = (statusPack: boolean) => {
        setIsMyPacks(statusPack)

    }
// Paginator
    let setsPages = [5,10,15,20,30]
    let pages = [];
    if (cardPacksTotalCount && setPage) {
        let pagesCount = Math.ceil(cardPacksTotalCount / setPage);
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }
    }

    const onPageChanged = () => {
        console.log(pageNumber, setPage)
        dispatch(setPacksTC({page: pageNumber, pageCount: setPage, }))
    }
    return (
        <div className={s.container}>
            <div className={s.containerFilter}>
                <div className={s.blockShowCards}>
                    <p>Show packs cards</p>
                    <div className={s.blockButtonsShowCards}>
                        <div className={isMyPacks ? `${s.buttonShowCards} ${s.buttonShowCardsActive}`: s.buttonShowCards}
                             onClick={()=>changeWhosePacks(true)}>My</div>
                        <div className={!isMyPacks ? `${s.buttonShowCards} ${s.buttonShowCardsActive}`: s.buttonShowCards}
                             onClick={()=>changeWhosePacks(false)}>All</div>
                    </div>
                </div>
                <DoubleRange
                    min={Number(min)}
                    max={Number(max)}
                    setMax={setMax}
                    setMin={setMin}
                />
            </div>
            <div className={s.containerPackList}>
                <p className={s.titlePackList}>Packs list</p>
                <div className={s.blockSearch}>
                    <div className={s.search}>
                        <div className={s.svgSearch}>
                            <SvgSelector id={'search'}/>
                        </div>
                        <input type="text" placeholder={'Search...'}/>
                    </div>
                    <button >Add new pack</button>
                </div>
                <div className={s.blockPacks}>
                    <div className={s.packsHeader}>
                        <div className={s.packsBlockLarge}>Name</div>
                        <div className={s.packsBlockSmall}>Cards</div>
                        <div className={s.packsBlockMedium}>Last Updated</div>
                        <div className={s.packsBlockMedium}>Created by</div>
                        <div className={s.packsBlockLarge}>Actions</div>
                    </div>
                    {
                        packs.map(p => {
                            let date = p.updated.substring(0, 10)
                       return <div className={s.pack} key={p._id}>
                            <div className={s.packsBlockLarge}>{p.name}</div>
                            <div className={s.packsBlockSmall}>{p.cardsCount}</div>
                            <div className={s.packsBlockMedium}>{date}</div>
                            <div className={s.packsBlockMedium}>{p.user_name}</div>
                            <div className={s.packsBlockLarge}>
                                <div className={s.packButtons}>
                                    <button className={s.buttonDelete}>Delete</button>
                                    <button>Edit</button>
                                    <button>Learn</button>
                                </div>
                            </div>
                        </div>
                    })}
                </div>
                <div className={s.pagination}>
                    {pages.map(p =>{
                        return <span
                             className={page === p ? s.selectedPage + ' ' + s.OtherPage : s.OtherPage}
                             onClick={(e) =>{setPageNumber(p)}                             }
                            key={p}>
                            {p}</span>
                    })}
                </div>
                <div className={s.setPagination}>
                    {setsPages.map(p =>{
                        return <span
                            className={s.OtherPage}
                            onClick={(e) => {setSetPage(p)}}
                            key={p}>
                            {p}</span>
                    })}
                </div>
            </div>
        </div>
    )
}