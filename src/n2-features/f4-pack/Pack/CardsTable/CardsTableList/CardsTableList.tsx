import React from 'react';
import {CardItem} from "./CardItem/CardItem";
import {CardType} from "../../../../../n1-main/m2-bll/a2-reducers/cards-reducer";

export const CardsTableList: React.FC<CardsTableListType> = (props) => {
    const {cards, actionColumn} = props;

    return (
        <div>
            {cards.map((card, index) =>
                <CardItem
                    key={card._id}
                    cardId={card._id}
                    index={index + 1}
                    grade={card.grade}
                    answer={card.answer}
                    question={card.question}
                    lastUpdated={card.updated}
                    actionColumn={actionColumn}
                />)
            }

        </div>
    );
};

type CardsTableListType = {
    cards: CardType[];
    actionColumn: boolean;
}