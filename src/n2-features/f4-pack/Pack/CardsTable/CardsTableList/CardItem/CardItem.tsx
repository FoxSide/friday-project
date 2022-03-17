import React from 'react';
import Rating from "react-rating";
import s from "./CardItem.module.css";
import {BsStar, BsStarFill} from "react-icons/bs";

export const CardItem: React.FC<CardItemType> = (props) => {
    const {
        index,
        grade,
        answer,
        question,
        lastUpdated,
    } = props;

    const backgroundColor = index % 2 !== 0 ? "#fff" : "#F8F7FD";

    const date = new Date((Date.parse(lastUpdated)));
    const formattedDate = `${date.getDay()}.${date.getMonth()}.${date.getFullYear()}`;

    return (
        <div className={s.cardItem} style={{backgroundColor: backgroundColor}}>
            <div className={s.question}>{question}</div>
            <div className={s.answer}>{answer}</div>
            <div className={s.lastUpdated}>{formattedDate}</div>
            <div className={s.grade}>
                <Rating
                    readonly
                    initialRating={grade}
                    emptySymbol={<BsStar />}
                    fullSymbol={<BsStarFill/>}
                />
            </div>
        </div>
    );
};

type CardItemType = {
    index: number;
    grade: number;
    answer: string;
    question: string;
    lastUpdated: string
};
