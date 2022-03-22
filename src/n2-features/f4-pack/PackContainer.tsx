import {Pack} from "./Pack/Pack";
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../n1-main/m2-bll/a1-redux-store/store";
import {
    setCurrentPage,
    CardsStateType,
    fetchingCardsData,
    setCountItemsOnPage
} from "../../n1-main/m2-bll/a2-reducers/cards-reducer";
import {useParams} from "react-router-dom";

export const PackContainer = () => {
    // const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const {
        page,
        cards,
        pageCount,
        cardsTotalCount,
    } = useSelector<AppRootStateType, CardsStateType>(state => state.cards);

    const dispatch = useDispatch();
    const {packID} = useParams();

    const id = packID ? packID : "";
    const setCurrentPageCallback = (currentPage: number) => dispatch(setCurrentPage(currentPage));
    const setCountItemsOnPageCallback = (countItemsOnPage: number) => dispatch(setCountItemsOnPage(countItemsOnPage));

    useEffect(() => {
        dispatch(fetchingCardsData(id));
    }, [page, pageCount, id]);

    // if (!isLoggedIn) {
    //     return <Navigate to={'/login'}/>
    // }

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