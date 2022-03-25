import s from "./PackListTable.module.css"
import {SearchAddBlock} from "./SearchAddBlock/SearchAddBlock";
import {ItemPacks} from "./ItemPacks/ItemPacks";
import React, {useEffect, useState} from "react";
import {cardPacksType} from "../../../n1-main/m2-bll/a2-reducers/pack-list-reducer";
import {PaginationBlock} from "../../f4-pack/Pack/PaginationBlock/PaginationBlock";
import {SvgSelector} from "../../../n1-main/m1-ui/common/SvgSelector/SvgSelector";
import {TNullable} from "../../../n1-main/m2-bll/a2-reducers/profile-reducer";

type  PropsType = {
    packs: cardPacksType[]
    setCurrentPacksPageCallBack: (currentPage: number) => void
    setCountItemsPacksOnPageCallBack: (countItemsOnPage: number) => void
    setSortPacksOnPageCallBack: (sortPacks: string) => void
    pageCount: number
    page: number
    cardPacksTotalCount: number
    deleteMyPackCallBack: (name: string, packId: string) => void
    addPackCallBack?: () => void
    UserId: TNullable<string>
    sortPacks: string
    setSearchNameCallBack: (searchName: string)=>void
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
                                  deleteMyPackCallBack,
                                  addPackCallBack,
                                  UserId,
                                  sortPacks,
                                  setSearchNameCallBack,
                                  title,
                                  addBlockToggle
                              }: PropsType) => {

    const [iconSort, setIconSort] = useState('')
    const [buttonSort, setButtonSort] = useState('')

    const sortPack = (typeSort: string) => {
        if (sortPacks[0] === '0') {
            setSortPacksOnPageCallBack('1' + typeSort)
            setIconSort('down')
            setButtonSort(typeSort)
        } else if (sortPacks[0] === '1'){
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
            <SearchAddBlock addBlockToggle={addBlockToggle} addPackCallBack={addPackCallBack} setSearchNameCallBack={setSearchNameCallBack}/>
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
                            deleteMyPackCallBack={()=>{deleteMyPackCallBack(p.name, p._id)}}
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
        </div>
    )
}