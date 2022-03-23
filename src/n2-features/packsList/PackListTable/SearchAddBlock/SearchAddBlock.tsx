import s from "./SearchAddBlock.module.css";
import {SvgSelector} from "../../../../n1-main/m1-ui/common/SvgSelector/SvgSelector";
import React from "react";
import {SearchInputComponent} from "../../../../n1-main/m1-ui/common/searchInputComponent/SearchInputComponent";

type PropsType = {
    addPackCallBack: () => void
    setSearchNameCallBack: (searchName: string)=>void
}
export const SearchAddBlock = ({addPackCallBack, setSearchNameCallBack}: PropsType) => {
    return (
        <div className={s.blockSearch}>
            <div className={s.search}>
                <div className={s.svgSearch}>
                    <SvgSelector id={'search'}/>
                </div>
                <SearchInputComponent callBack={setSearchNameCallBack}/>
            </div>
            <button onClick={addPackCallBack}>Add new pack</button>
        </div>
    )
}