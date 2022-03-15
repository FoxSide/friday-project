import React from 'react';
import {CardItem} from "./CardItem/CardItem";
import {CardType} from "../../../../../n1-main/m2-bll/a2-reducers/cards-reducer";

export const CardsTableList: React.FC<CardsTableListType> = (props) => {
    const {cards} = props;

    return (
        <div>
            {cards.map((card, index) =>
                <CardItem
                    key={card._id}
                    index={index + 1}
                    grade={card.grade}
                    answer={card.answer}
                    question={card.question}
                    lastUpdated={card.updated}
                />)
            }

        </div>
    );
};

type CardsTableListType = {
    cards: CardType[];
}