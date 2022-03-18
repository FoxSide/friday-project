import s from "./SearchAddBlock.module.css";
import {SvgSelector} from "../../../../n1-main/m1-ui/common/SvgSelector/SvgSelector";
import React from "react";

export const SearchAddBlock = () => {
    return (
        <div className={s.blockSearch}>
            <div className={s.search}>
                <div className={s.svgSearch}>
                    <SvgSelector id={'search'}/>
                </div>
                <input type="text" placeholder={'Search...'}/>
            </div>
            <button >Add new pack</button>
        </div>
    )
}