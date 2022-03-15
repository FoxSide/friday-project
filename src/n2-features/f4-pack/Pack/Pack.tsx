import React from 'react';
import s from "./Pack.module.css"
import {CardsTable} from "./CardsTable/CardsTable";
import {SearchInput} from "./SearchInput/SearchInput";
import {PaginationBlock} from "./PaginationBlock/PaginationBlock";
import {GoBack} from "../../../n1-main/m1-ui/common/goBack/GoBack";
import {CardType} from "../../../n1-main/m2-bll/a2-reducers/cards-reducer";

export const Pack: React.FC<PackType> = (props) => {
    const { cards, ...paginationProps } = props;

    return (
        <div className={s.pack}>
            <GoBack />
            <SearchInput className={s.searchInput} placeholder={"Search..."} />
            <CardsTable cards={cards} />
            <PaginationBlock {...paginationProps}/>
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
};
