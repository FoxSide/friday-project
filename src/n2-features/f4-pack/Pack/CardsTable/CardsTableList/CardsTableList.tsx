import React from 'react';
import {CardItem} from "./CardItem/CardItem";
import {CardType} from "../../../../../n1-main/m2-bll/a2-reducers/cards-reducer";

export const CardsTableList: React.FC<CardsTableListType> = (props) => {
    const { cards } = props;

    return (
        <div>
            { cards.map((card, index) =>
                <CardItem question={card.question}
                          answer={card.answer}
                          lastUpdated={card.updated}
                          grade={card.grade}
                          key={card._id}
                          index={index + 1}
                          cardId={card._id}
                />)
            }

        </div>
    );
};

type CardsTableListType = {
    cards: CardType[];
}