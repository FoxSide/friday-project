import s from "./PackListFilter.module.css";
import {DoubleRange} from "../../../n1-main/m1-ui/common/doubleRange/DoubleRange";
import React from "react";

type PropsType = {
    isMyPacks: boolean
    setIsMyPacksCallBack: (isMyPacks: boolean) => void
    maxCardsCount: number
    minCardsCount: number
    setRangeCadsInPacksCallBack: (min: number, max: number) => void
    maxFilter: number,
    minFilter: number,
}

export const PackListFilter = ({
                                   isMyPacks,
                                   setIsMyPacksCallBack,
                                   maxCardsCount,
                                   minCardsCount,
                                   setRangeCadsInPacksCallBack,
                                   maxFilter,
                                   minFilter,
                               }: PropsType) => {


    return (
        <div className={s.containerFilter}>
            <div className={s.blockShowCards}>
                <p>Show packs cards</p>
                <div className={s.blockButtonsShowCards}>
                    <div className={isMyPacks ? `${s.buttonShowCards} ${s.buttonShowCardsActive}` : s.buttonShowCards}
                         onClick={() => setIsMyPacksCallBack(true)}>My
                    </div>
                    <div className={!isMyPacks ? `${s.buttonShowCards} ${s.buttonShowCardsActive}` : s.buttonShowCards}
                         onClick={() => setIsMyPacksCallBack(false)}>All
                    </div>
                </div>
            </div>
            <DoubleRange
                maxCardsCount={maxCardsCount}
                minCardsCount={minCardsCount}
                setRangeCadsInPacksCallBack={setRangeCadsInPacksCallBack}
                maxFilter={maxFilter}
            minFilter={minFilter}
            />
        </div>
    )
}