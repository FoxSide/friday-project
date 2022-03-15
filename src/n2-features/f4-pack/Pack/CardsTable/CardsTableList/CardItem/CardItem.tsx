import React from 'react';
import s from "./CardItem.module.css";
import Rating from "react-rating";
import {BsStar, BsStarFill} from "react-icons/bs";

export const CardItem: React.FC<CardItemType> = (props) => {
    const {
        cardId,
        question,
        answer,
        lastUpdated,
        grade,
        index,
    } = props;

    const backgroundColor = index % 2 !== 0 ? "#fff" : "#F8F7FD";
    const date = new Date((Date.parse(lastUpdated)));

    return (
        <div className={s.cardItem} style={{backgroundColor: backgroundColor}}>
            <div className={s.question}>{question}</div>
            <div className={s.answer}>{answer}</div>
            <div className={s.lastUpdated}>{`${date.getDay()}.${date.getMonth()}.${date.getFullYear()}`}</div>
            <div className={s.grade}>
                <Rating
                    emptySymbol={<BsStar />}
                    fullSymbol={<BsStarFill/>}
                    initialRating={grade}
                    readonly
                />
            </div>
        </div>
    );
};

type CardItemType = {
    cardId: string;
    index: number;
    question: string;
    answer: string;
    lastUpdated: string
    grade: number;
};
