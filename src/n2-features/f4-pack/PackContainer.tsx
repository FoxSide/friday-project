import React, {useEffect} from 'react';
import {Pack} from "./Pack/Pack";
import {useDispatch, useSelector} from "react-redux";
import {CardType, fetchingCardsData} from "../../n1-main/m2-bll/a2-reducers/cards-reducer";
import {AppRootStateType} from "../../n1-main/m2-bll/a1-redux-store/store";

export const PackContainer = () => {
    const cards = useSelector<AppRootStateType, CardType[]>(state => state.cards.cards)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchingCardsData("6037532fc0dbb40004589146"))
    }, [])

    return <Pack cards={cards} />
};