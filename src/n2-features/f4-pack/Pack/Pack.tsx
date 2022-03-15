import React from 'react';
import s from "./Pack.module.css"
import {GoBack} from "../../../n1-main/m1-ui/common/goBack/GoBack";
import {SearchInput} from "./SearchInput/SearchInput";
import {CardsTable} from "./CardsTable/CardsTable";
import {CardType} from "../../../n1-main/m2-bll/a2-reducers/cards-reducer";

export const Pack: React.FC<PackType> = (props) => {
    const { cards } = props;
    return (
        <div className={s.pack}>
            <GoBack/>
            <SearchInput className={s.searchInput} placeholder={"Search..."}/>
            <CardsTable cards={cards} />
            <div>Pagination</div>
        </div>
    );
};

type PackType = {
    cards: CardType[];
}