import s from "./PackListTable.module.css"
import {SearchAddBlock} from "./SearchAddBlock/SearchAddBlock";
import {ItemPacks} from "./ItemPacks/ItemPacks";
import React, {useEffect, useState} from "react";
import {
    addNewPackTC,
    cardPacksType,
    deletePackTC,
    updatePackNameAC
} from "../../../n1-main/m2-bll/a2-reducers/pack-list-reducer";
import {PaginationBlock} from "../../f4-pack/Pack/PaginationBlock/PaginationBlock";
import {SvgSelector} from "../../../n1-main/m1-ui/common/SvgSelector/SvgSelector";
import {TNullable} from "../../../n1-main/m2-bll/a2-reducers/profile-reducer";
import Modal from "../../../n1-main/m1-ui/common/Modal/Modal";
import {AddPack} from "../../../n1-main/m1-ui/common/Modal/AddingPack/AddPack";
import {EditPack} from "../../../n1-main/m1-ui/common/Modal/EditPack/EditPack";
import {DeletePack} from "../../../n1-main/m1-ui/common/Modal/DeletePack/DeletePack";
import {EModeType} from "../PacksList";
import {useDispatch} from "react-redux";

type  PropsType = {
    packs: cardPacksType[]
    setCurrentPacksPageCallBack: (currentPage: number) => void
    setCountItemsPacksOnPageCallBack: (countItemsOnPage: number) => void
    setSortPacksOnPageCallBack: (sortPacks: string) => void
    pageCount: number
    page: number
    cardPacksTotalCount: number
    // packCallBack: (name: string, packId: string) => void
    // addPackCallBack?: () => void
    UserId: TNullable<string>
    sortPacks: string
    setSearchNameCallBack: (searchName: string) => void
    title: string
    addBlockToggle: boolean
}

export const PackListTable = ({
                                  packs,
                                  setCurrentPacksPageCallBack,
                                  setCountItemsPacksOnPageCallBack,
                                  setSortPacksOnPageCallBack,
                                  pageCount,
                                  page,
                                  cardPacksTotalCount,
                                  // packCallBack,
                                  // addPackCallBack,
                                  UserId,
                                  sortPacks,
                                  setSearchNameCallBack,
                                  title,
                                  addBlockToggle
                              }: PropsType) => {

    const [iconSort, setIconSort] = useState('')
    const [buttonSort, setButtonSort] = useState('')

    //======================================

    const dispatch = useDispatch()

    const deleteMyPackCallBack = (name: string, packId: string) => {
        setShowModal(true)
        setMode(EModeType.DELETE_MODE)
        setPackData({name, packId})
    }

    const editMyPackCallBack = (name: string, packId: string) => {
        setShowModal(true)
        setMode(EModeType.EDIT_MODE)
        setPackData({name, packId})
    }

    const onAddPackCallBack = () => {
        setShowModal(true)
        setMode(EModeType.ADD_MODE)
    }

    const [packData, setPackData] = useState({name: '', packId: ''})
    const [mode, setMode] = useState<EModeType | null>(null)
    const [showModal, setShowModal] = useState(false);

    const onDeletePackHandler = () => {
        dispatch(deletePackTC(packData.packId, UserId))
        setShowModal(false)
    }

    const onDeletePackCancelHandler = () => {
        setShowModal(false)
    }

    const onAddPackSaveHandler = (name: string) => {
        dispatch(addNewPackTC(name, UserId))
        setShowModal(false)
    }

    const onEditPackSaveHandler = (name: string) => {
        dispatch(updatePackNameAC(name, UserId, packData.packId))
        setShowModal(false)
    }

    const onModalCancelHandler = () => {
        setShowModal(false)
    }
    //======================================

    const sortPack = (typeSort: string) => {
        if (sortPacks[0] === '0') {
            setSortPacksOnPageCallBack('1' + typeSort)
            setIconSort('down')
            setButtonSort(typeSort)
        } else if (sortPacks[0] === '1') {
            setSortPacksOnPageCallBack('0' + typeSort)
            setIconSort('up')
            setButtonSort(typeSort)
        } else {
            setButtonSort(typeSort)
            setSortPacksOnPageCallBack('0' + typeSort)
            setIconSort('up')
        }
    }
    console.log(iconSort)
    return (
        <div className={s.containerPackList}>
            <p className={s.titlePackList}>{title}</p>
            <SearchAddBlock addBlockToggle={addBlockToggle} addPackCallBack={onAddPackCallBack}
                            setSearchNameCallBack={setSearchNameCallBack}/>
            <div className={s.blockPacks}>
                <div className={s.packsHeader}>
                    <div className={s.packsBlockLarge} onClick={() => sortPack('name')}>Name
                        {buttonSort === 'name' && <SvgSelector id={iconSort}/>}
                    </div>
                    <div className={s.packsBlockSmall} onClick={() => sortPack('cardsCount')}>Cards
                        {buttonSort === 'cardsCount' && <SvgSelector id={iconSort}/>}
                    </div>
                    <div className={s.packsBlockMedium} onClick={() => sortPack('updated')}>Last Updated
                        {buttonSort === 'updated' && <SvgSelector id={iconSort}/>}
                    </div>
                    <div className={s.packsBlockMedium} onClick={() => sortPack('user_name')}>Created by
                        {buttonSort === 'user_name' && <SvgSelector id={iconSort}/>}
                    </div>
                    <div className={s.packsBlockLarge}>Actions</div>
                </div>
                <div>
                    {packs.map(p =>
                        <ItemPacks
                            id={p._id}
                            name={p.name}
                            cardsCount={p.cardsCount}
                            updated={p.updated}
                            userName={p.user_name}
                            UserId={UserId}
                            OwnerId={p.user_id}
                            onDeleteCallBack={() => {
                                deleteMyPackCallBack(p.name, p._id)
                            }}
                            onEditCallBack={() => {
                                editMyPackCallBack(p.name, p._id)
                            }}
                        />
                    )}
                </div>
            </div>
            <div className={s.pagination}>
                <PaginationBlock
                    pageSize={pageCount}
                    totalCount={cardPacksTotalCount}
                    currentPage={page}
                    setCurrentPageCallback={setCurrentPacksPageCallBack}
                    setCountItemsOnPageCallback={setCountItemsPacksOnPageCallBack}
                />
            </div>
            <Modal width={395}
                   height={221}
                   enableBackground={true}
                   backgroundOnClick={() => setShowModal(false)}
                   show={showModal}
            >
                {mode === EModeType.ADD_MODE &&
                <AddPack onSave={onAddPackSaveHandler} onCancel={onModalCancelHandler}/>}
                {mode === EModeType.EDIT_MODE &&
                <EditPack packName={packData.name} onSave={onEditPackSaveHandler} onCancel={onModalCancelHandler}/>}
                {mode === EModeType.DELETE_MODE && <DeletePack packData={packData} onDelete={onDeletePackHandler}
                                                               onCancel={onDeletePackCancelHandler}/>}
            </Modal>
        </div>
    )
}