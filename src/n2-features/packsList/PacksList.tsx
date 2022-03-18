import s from './PacksList.module.css'
import {
    cardPacksType,
    getPacksTC,
    PackListStateType, setCountItemsPacksOnPage,
    setCurrentPacksPage, setIsMyPacks, setRangeCadsInPacks, setSortPacksOnPage
} from "../../n1-main/m2-bll/a2-reducers/pack-list-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../n1-main/m2-bll/a1-redux-store/store";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {PackListFilter} from "./PackListFilter/PackListFilter";
import {PackListTable} from "./PackListTable/PackListTable";

export const PacksList = () => {
    const dispatch = useDispatch()
    const {
        page,
        pageCount,
        isMyPacks,
        maxCardsCount,
        minCardsCount,
        sortPacks,
        cardPacksTotalCount,
    } = useSelector<AppRootStateType, PackListStateType>(state => state.packList)
    const packs = useSelector<AppRootStateType, cardPacksType[]>(state => state.packList.cardPacks)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)

    const setCurrentPacksPageCallBack = (currentPage: number) => dispatch(setCurrentPacksPage(currentPage))
    const setCountItemsPacksOnPageCallBack = (countItemsOnPage: number) => dispatch(setCountItemsPacksOnPage(countItemsOnPage))
    const setIsMyPacksCallBack = (isMyPacks: boolean) => dispatch(setIsMyPacks(isMyPacks))
    const setRangeCadsInPacksCallBack = (min: number, max: number) => dispatch(setRangeCadsInPacks(min, max))
    const setSortPacksOnPageCallBack = (sortPacks: string) => dispatch(setSortPacksOnPage(sortPacks))
    const navigate = useNavigate()

    useEffect(() => {
        {
            if (!isLoggedIn) {
                navigate('/login')
            } else {
                dispatch(getPacksTC())
                console.log('Загрузка страницы')
            }
        }
    }, [page, pageCount])

    return (
        <div className={s.container}>
            <PackListFilter
                isMyPacks={isMyPacks}
                setIsMyPacksCallBack={setIsMyPacksCallBack}
                maxCardsCount={maxCardsCount}
                minCardsCount={minCardsCount}
                setRangeCadsInPacksCallBack={setRangeCadsInPacksCallBack}
            />
            <PackListTable
                packs={packs}
                setCurrentPacksPageCallBack={setCurrentPacksPageCallBack}
                setCountItemsPacksOnPageCallBack={setCountItemsPacksOnPageCallBack}
                setSortPacksOnPageCallBack={setSortPacksOnPageCallBack}
                pageCount={pageCount}
                page={page}
                cardPacksTotalCount={cardPacksTotalCount}
            />
        </div>
    )
}