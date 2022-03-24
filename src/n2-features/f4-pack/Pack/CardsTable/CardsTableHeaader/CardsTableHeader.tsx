import React from 'react';
import s from "./CardsTableHeader.module.css";

export const CardsTableHeader: React.FC<CardsTableHeaderType> = ({actionColumn}) => {
    return (
        <div className={s.cardsTableHeader}>
            <div className={s.question}>Question</div>
            <div className={s.answer}>Answer</div>
            <div className={s.lastUpdated}>Last Updated</div>
            <div className={s.grade}>Grade</div>
           { actionColumn && <div className={s.actions}>Actions</div> }
        </div>
    );
};

type CardsTableHeaderType = {
   actionColumn: boolean
}