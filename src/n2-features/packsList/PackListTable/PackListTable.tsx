import s from "./PackListTable.module.css"
import {SearchAddBlock} from "./SearchAddBlock/SearchAddBlock";
import {ItemPacks} from "./ItemPacks/ItemPacks";
import React from "react";
import {cardPacksType} from "../../../n1-main/m2-bll/a2-reducers/pack-list-reducer";
import {PaginationBlock} from "../../f4-pack/Pack/PaginationBlock/PaginationBlock";

type  PropsType = {
    packs: cardPacksType[]
    setCurrentPacksPageCallBack: (currentPage: number) => void
    setCountItemsPacksOnPageCallBack: (countItemsOnPage: number) => void
    setSortPacksOnPageCallBack: (sortPacks: string) => void
    pageCount: number
    page: number
    cardPacksTotalCount: number
    deleteMyPackCallBack: () => void
    addPackCallBack: () => void
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
                              }: PropsType) => {
    return (
        <div className={s.containerPackList}>
            <p className={s.titlePackList}>Packs list</p>
            <SearchAddBlock addPackCallBack={addPackCallBack} />
            <div className={s.blockPacks}>
                <div className={s.packsHeader}>
                    <div className={s.packsBlockLarge}>Name</div>
                    <div className={s.packsBlockSmall}>Cards</div>
                    <div className={s.packsBlockMedium}>Last Updated</div>
                    <div className={s.packsBlockMedium}>Created by</div>
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
                            deleteMyPackCallBack={deleteMyPackCallBack}
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
                {/*{pages.map(p => {*/}
                {/*    return <span*/}
                {/*        className={page === p ? s.selectedPage + ' ' + s.OtherPage : s.OtherPage}*/}
                {/*        onClick={(e) => {*/}
                {/*            setPageNumber(p)*/}
                {/*        }}*/}
                {/*        key={p}>*/}
                {/*            {p}</span>*/}
                {/*})}*/}
            </div>
            {/*<div className={s.setPagination}>*/}
            {/*    {setsPages.map(p => {*/}
            {/*        return <span*/}
            {/*            className={s.OtherPage}*/}
            {/*            onClick={(e) => {*/}
            {/*                setSetPage(p)*/}
            {/*            }}*/}
            {/*            key={p}>*/}
            {/*                {p}</span>*/}
            {/*    })}*/}
            {/*</div>*/}
        </div>
    )
}