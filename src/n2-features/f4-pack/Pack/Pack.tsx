import React from 'react';
import s from "./Pack.module.css"
import {GoBack} from "../../../n1-main/m1-ui/common/goBack/GoBack";
import {SearchInput} from "./SearchInput/SearchInput";
import {CardsTable} from "./CardsTable/CardsTable";
import {CardType} from "../../../n1-main/m2-bll/a2-reducers/cards-reducer";
import {Pagination} from "../../../n1-main/m1-ui/common/pagination/Pagination";
import {SelectCountItemsOnPage} from "../../../n1-main/m1-ui/common/selectCountItemsOnPage/SelectCountItemsOnPage";

export const Pack: React.FC<PackType> = (props) => {
    const {
        cards,
        pageSize,
        totalCount,
        currentPage,
        setCurrentPageCallback,
        setCountItemsOnPageCallback,
    } = props;
    return (
        <div className={s.pack}>
            <GoBack />
            <SearchInput
                className={s.searchInput}
                placeholder={"Search..."}
            />
            <CardsTable cards={cards} />
            <div className={s.paginationBlock}>
                <Pagination
                    paginatorSize={6}
                    pageSize={pageSize}
                    totalCount={totalCount}
                    currentPage={currentPage}
                    setCurrentPageCallback={setCurrentPageCallback}
                />
                <SelectCountItemsOnPage
                    selectLength={5}
                    setCountItemsOnPageCallback={setCountItemsOnPageCallback}
                />
            </div>
        </div>
    );
};

type PackType = {
    pageSize: number;
    cards: CardType[];
    totalCount: number;
    currentPage: number;
    setCurrentPageCallback: (currentPage: number) => void;
    setCountItemsOnPageCallback: (countItemsOnPage: number) => void;
}