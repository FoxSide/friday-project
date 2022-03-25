import {Pack} from "./Pack/Pack";
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../n1-main/m2-bll/a1-redux-store/store";
import {
    setCurrentPage,
    CardsStateType,
    fetchingCardsData,
    setCountItemsOnPage, setSearchCardQuestion, setSortCardColumn
} from "../../n1-main/m2-bll/a2-reducers/cards-reducer";
import {useParams} from "react-router-dom";
import {string} from "yup";
import useDebounce from "../../utils/hooks/useDebounse-hook";
import {setSortPacksOnPage} from "../../n1-main/m2-bll/a2-reducers/pack-list-reducer";

export const PackContainer = () => {
    // const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const {
        page,
        cards,
        pageCount,
        cardsTotalCount,
        cardQuestion,
        sort,
    } = useSelector<AppRootStateType, CardsStateType>(state => state.cards);

    const dispatch = useDispatch();
    const {packID} = useParams();

    const id = packID ? packID : "";
    const setCurrentPageCallback = (currentPage: number) => dispatch(setCurrentPage(currentPage));
    const setCountItemsOnPageCallback = (countItemsOnPage: number) => dispatch(setCountItemsOnPage(countItemsOnPage));
    const setSearchCardQuestionCallback = (cardQuestion: string) => dispatch(setSearchCardQuestion(cardQuestion));
    const setSortCardColumnCallBack = (sort: string) => dispatch(setSortCardColumn(sort))

    const debounceCardQuestion = useDebounce<string>(cardQuestion, 1500)
    const debounceSort = useDebounce<string>(sort, 500)


    useEffect(() => {
        dispatch(fetchingCardsData(id));
    }, [page, pageCount, id, debounceCardQuestion, debounceSort]);

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
            setSearchCardQuestionCallback={setSearchCardQuestionCallback}
            setSortCardColumnCallBack={setSortCardColumnCallBack}
            sort={sort}
        />);
};