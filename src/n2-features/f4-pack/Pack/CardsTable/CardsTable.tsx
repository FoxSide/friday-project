import React from 'react';
import s from "./CardsTable.module.css";
import {CardsTableList} from "./CardsTableList/CardsTableList";
import {CardsTableHeader} from "./CardsTableHeaader/CardsTableHeader";
import {CardType} from "../../../../n1-main/m2-bll/a2-reducers/cards-reducer";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../../n1-main/m2-bll/a1-redux-store/store";
import {string} from "yup";

export const CardsTable: React.FC<CardsTableType> = (props) => {
    const {cards, setSortCardColumnCallBack, sort} = props;
    const userId = useSelector<AppRootStateType, string | undefined>((state) => state.profile?._id)
    const packUserId = useSelector<AppRootStateType, string>((state) => state.cards.packUserId)

    const actionColumn = userId === packUserId

    return (
        <div className={s.cardsTable}>
            <CardsTableHeader actionColumn={actionColumn}
                              sort={sort}
                              setSortCardColumnCallBack={setSortCardColumnCallBack}/>
            <CardsTableList cards={cards} actionColumn={actionColumn}/>
        </div>
    );
};
type CardsTableType = {
    cards: CardType[]
    setSortCardColumnCallBack: (sort: string) => void
    sort:string;
}
