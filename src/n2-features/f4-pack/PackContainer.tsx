import React, {useEffect} from 'react';
import {Pack} from "./Pack/Pack";
import {useDispatch, useSelector} from "react-redux";
import {
    CardsStateType,
    fetchingCardsData,
    setCountItemsOnPage,
    setCurrentPage
} from "../../n1-main/m2-bll/a2-reducers/cards-reducer";
import {AppRootStateType} from "../../n1-main/m2-bll/a1-redux-store/store";

export const PackContainer = () => {
    const {
        page,
        cards,
        pageCount,
        cardsTotalCount,
    } = useSelector<AppRootStateType, CardsStateType>(state => state.cards);

    const dispatch = useDispatch();

    const setCurrentPageCallback = (currentPage: number) => dispatch(setCurrentPage(currentPage));
    const setCountItemsOnPageCallback = (countItemsOnPage: number) => dispatch(setCountItemsOnPage(countItemsOnPage));

    useEffect(() => {
        dispatch(fetchingCardsData("605cb468338d2c15f075ba82"));
    }, [page, pageCount]);

    return (
        <Pack
            cards={cards}
            currentPage={page}
            pageSize={pageCount}
            totalCount={cardsTotalCount}
            setCurrentPageCallback={setCurrentPageCallback}
            setCountItemsOnPageCallback={setCountItemsOnPageCallback}
        />);
};