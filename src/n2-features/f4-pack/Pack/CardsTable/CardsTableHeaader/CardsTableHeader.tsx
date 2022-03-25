import React, {useState} from 'react';
import s from "./CardsTableHeader.module.css";
import {string} from "yup";
import {SvgSelector} from "../../../../../n1-main/m1-ui/common/SvgSelector/SvgSelector";

export const CardsTableHeader: React.FC<CardsTableHeaderType> = ({actionColumn,
                                                                     sort,
                                                                     setSortCardColumnCallBack}) => {
    const [iconSort, setIconSort] = useState('')
    const [buttonSort, setButtonSort] = useState('')

    const sortPack = (typeSort: string) => {
        if (sort[0] === '0') {
            setSortCardColumnCallBack('1' + typeSort)
            setIconSort('down')
            setButtonSort(typeSort)
        } else if (sort[0] === '1'){
            setSortCardColumnCallBack('0' + typeSort)
            setIconSort('up')
            setButtonSort(typeSort)
        } else {
            setButtonSort(typeSort)
            setSortCardColumnCallBack('0' + typeSort)
            setIconSort('up')
        }
    }
//  question answer updated grade
    return (
        <div className={s.cardsTableHeader}>
            {buttonSort === 'question' && <SvgSelector id={iconSort}/>}
            <div className={s.question} onClick={() => sortPack('question')}>Question</div>
            {buttonSort === 'answer' && <SvgSelector id={iconSort}/>}
            <div className={s.answer } onClick={() => sortPack('answer')}>Answer</div>
            {buttonSort === 'updated' && <SvgSelector id={iconSort}/>}
            <div className={s.lastUpdated} onClick={() => sortPack('updated')}>Last Updated</div>
            {buttonSort === 'grade' && <SvgSelector id={iconSort}/>}
            <div className={s.grade} onClick={() => sortPack('grade')}>Grade</div>
            {actionColumn && <div className={s.actions}>Actions</div>}
        </div>
    );
};

type CardsTableHeaderType = {
    actionColumn: boolean
    setSortCardColumnCallBack: (sort: string) => void
    sort:string

}