import React from 'react';
import s from "./CardsTable.module.css";
import {CardsTableList} from "./CardsTableList/CardsTableList";
import {CardsTableHeader} from "./CardsTableHeaader/CardsTableHeader";
import {CardType} from "../../../../n1-main/m2-bll/a2-reducers/cards-reducer";

export const CardsTable: React.FC<CardsTableType> = (props) => {
    const { cards } = props;

    return (
        <div className={s.cardsTable}>
            <CardsTableHeader/>
            <CardsTableList cards={cards} />
        </div>
    );
};
type CardsTableType = {
    cards: CardType[];
}
