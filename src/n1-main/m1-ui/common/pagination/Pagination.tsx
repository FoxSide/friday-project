import React, {MouseEvent, useMemo, useState} from 'react';
import s from "./Pagination.module.css";
import {BsChevronLeft, BsChevronRight} from "react-icons/bs";

export const Pagination: React.FC<PaginationType> = React.memo((props) => {
    const {
        currentPage,
        totalCount,
        pageSize,
        paginatorSize,
        setCurrentPageCallback,
    } = props;

    const [paginatorNumber, setPaginatorNumber] = useState(1);
    const leftPaginatorPageSize = (paginatorNumber - 1) * paginatorSize + 1;
    const rightPaginatorPageSize = paginatorNumber * paginatorSize;

    const massPages = useMemo(() => {
        const countPages = Math.ceil(totalCount / pageSize)
        let pages: number[] = []
        for (let i = 1; i <= countPages; i++) {
            pages.push(i)
        }
        return pages
    }, [pageSize, totalCount]);

    const onClickPage = (e: MouseEvent<HTMLButtonElement>) => setCurrentPageCallback(Number(e.currentTarget.value))
    const onClickPrev = () => setPaginatorNumber(paginatorNumber - 1)
    const onClickNext = () => setPaginatorNumber(paginatorNumber + 1)

    const prev = paginatorNumber > 1 &&
        <button
            onClick={onClickPrev}
            className={s.prev}
        >
            <BsChevronLeft/>
        </button>;

    const next = rightPaginatorPageSize < massPages.length &&
        <button
            onClick={onClickNext}
            className={s.next}
        >
            <BsChevronRight/>
        </button>;

    const pages = massPages
        .filter(p => p >= leftPaginatorPageSize && p <= rightPaginatorPageSize)
        .map(p => {
            const fullClassPage = `${s.page} ${currentPage === p && s.active}`;
            return (
                <button
                    key={p}
                    className={fullClassPage}
                    onClick={onClickPage}
                    value={p}
                >
                    {p}
                </button>)
        });

    return (
        <div className={s.pages}>
            { prev }
            { pages }
            { next }
        </div>
    );
});

type PaginationType = {
    pageSize: number;
    totalCount: number;
    currentPage: number;
    paginatorSize: number;
    setCurrentPageCallback: (currentPage: number) => void;
}