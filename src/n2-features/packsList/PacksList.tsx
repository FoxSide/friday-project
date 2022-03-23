import s from './PacksList.module.css'
import {
    addNewPackTC,
    cardPacksType,
    getPacksTC,
    PackListStateType, setCountItemsPacksOnPage,
    setCurrentPacksPage, setIsMyPacks, setRangeCadsInPacks, setSearchName, setSortPacksOnPage
} from "../../n1-main/m2-bll/a2-reducers/pack-list-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../n1-main/m2-bll/a1-redux-store/store";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {PackListFilter} from "./PackListFilter/PackListFilter";
import {PackListTable} from "./PackListTable/PackListTable";
import Modal from "../../n1-main/m1-ui/common/Modal/Modal";
import SuperInputText from "../../n1-main/m1-ui/common/super-input-text/SuperInputText";
import {AddPack} from "../../n1-main/m1-ui/common/Modal/AddingPack/AddPack";

import useDebounce from "../../utils/hooks/useDebounse-hook";

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
        maxFilter,
        minFilter,
        searchName,
    } = useSelector<AppRootStateType, PackListStateType>(state => state.packList)
    const packs = useSelector<AppRootStateType, cardPacksType[]>(state => state.packList.cardPacks)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    // @ts-ignore
    const UserId = useSelector<AppRootStateType, string | null>(state => state.profile?._id)

    const setCurrentPacksPageCallBack = (currentPage: number) => dispatch(setCurrentPacksPage(currentPage))
    const setCountItemsPacksOnPageCallBack = (countItemsOnPage: number) => dispatch(setCountItemsPacksOnPage(countItemsOnPage))
    const setIsMyPacksCallBack = (isMyPacks: boolean) => dispatch(setIsMyPacks(isMyPacks))
    const setRangeCadsInPacksCallBack = (min: number, max: number) => dispatch(setRangeCadsInPacks(min, max))
    const setSortPacksOnPageCallBack = (sortPacks: string) => dispatch(setSortPacksOnPage(sortPacks))
    const setSearchNameCallBack = (searchName: string) => dispatch(setSearchName(searchName))

    const deleteMyPackCallBack = () => dispatch(() => {
    })
    const onAddPackCallBack = () => {
        setShowModal(true)
    }
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false);

    const onAddPackHandler = (name: string) => {
        dispatch(addNewPackTC(name))
        setShowModal(false)
    }

    const onCancelHandler = () => {
        setShowModal(false)
    }

    const debouncedMinFilter = useDebounce<number>(minFilter, 1500)
    const debouncedMaxFilter = useDebounce<number>(maxFilter, 1500)
    const debouncedSearchName = useDebounce<string>(searchName, 1500)


    useEffect(() => {
        {
            if (!isLoggedIn) {
                navigate('/login')
            } else {
                dispatch(getPacksTC(UserId))
            }
        }
    }, [page, pageCount, debouncedMaxFilter, debouncedMinFilter, isMyPacks, isLoggedIn, sortPacks, debouncedSearchName])

    return (
        <div className={s.container}>
            <PackListFilter
                isMyPacks={isMyPacks}
                setIsMyPacksCallBack={setIsMyPacksCallBack}
                maxCardsCount={maxCardsCount}
                minCardsCount={minCardsCount}
                setRangeCadsInPacksCallBack={setRangeCadsInPacksCallBack}
                maxFilter={maxFilter}
                minFilter={minFilter}

            />
            <PackListTable
                packs={packs}
                setCurrentPacksPageCallBack={setCurrentPacksPageCallBack}
                setCountItemsPacksOnPageCallBack={setCountItemsPacksOnPageCallBack}
                setSortPacksOnPageCallBack={setSortPacksOnPageCallBack}
                pageCount={pageCount}
                page={page}
                cardPacksTotalCount={cardPacksTotalCount}
                deleteMyPackCallBack={deleteMyPackCallBack}
                addPackCallBack={onAddPackCallBack}
                UserId={UserId}
                sortPacks={sortPacks}
                setSearchNameCallBack={setSearchNameCallBack}
            />
            <Modal width={395}
                   height={221}
                   enableBackground={true}
                   backgroundOnClick={() => setShowModal(false)}
                   show={showModal}
            >
                <AddPack onSave={onAddPackHandler} onCancel={onCancelHandler}/>
            </Modal>
        </div>
    )
}