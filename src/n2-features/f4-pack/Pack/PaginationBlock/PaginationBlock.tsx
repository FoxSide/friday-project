import React from 'react';
import s from "./PaginationBlock.module.css";
import {CardsListEnum} from "../../Enum/cardsListEnum";
import {Pagination} from "../../../../n1-main/m1-ui/common/pagination/Pagination";
import {SelectCountItemsOnPage} from "../../../../n1-main/m1-ui/common/selectCountItemsOnPage/SelectCountItemsOnPage";

export const PaginationBlock: React.FC<PaginationBlockType> = (props) => {
    const {
        pageSize,
        totalCount,
        currentPage,
        setCurrentPageCallback,
        setCountItemsOnPageCallback,
    } = props;

    return (
        <div className={s.paginationBlock}>
            <Pagination
                pageSize={pageSize}
                totalCount={totalCount}
                currentPage={currentPage}
                paginatorSize={CardsListEnum.PAGINATOR_SIZE}
                setCurrentPageCallback={setCurrentPageCallback}
            />
            <SelectCountItemsOnPage
                selectLength={CardsListEnum.SELECT_LENGTH}
                setCountItemsOnPageCallback={setCountItemsOnPageCallback}
            />
        </div>
    );
};

type PaginationBlockType = {
    pageSize: number;
    totalCount: number;
    currentPage: number;
    setCurrentPageCallback: (currentPage: number) => void;
    setCountItemsOnPageCallback: (countItemsOnPage: number) => void;
}