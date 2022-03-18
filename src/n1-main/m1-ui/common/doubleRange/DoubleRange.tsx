import {useState} from "react";
import Nouislider from "nouislider-react";
import 'nouislider/dist/nouislider.css';
import s from './DoubleRange.module.css'
import './NouisliderCustom.css'

type PropsType = {
    maxCardsCount: number
    minCardsCount: number
    setRangeCadsInPacksCallBack: (min: number, max: number) => void
}

export const DoubleRange = ({maxCardsCount, minCardsCount, setRangeCadsInPacksCallBack}: PropsType) => {



    const onChangeRangeDouble = (e: number[]) => {
        setRangeCadsInPacksCallBack(Math.round(e[0]), Math.round(e[1]))
    }

    return (
<div className={s.container}>
    <p>Number of cards</p>
    <div>
        <div className={s.blockSlider}>
                <Nouislider range={{min: 0, max: 100}}
                            start={[minCardsCount, maxCardsCount]}
                            connect
                            onChange={onChangeRangeDouble}
                    // @ts-ignore
                            tooltips={{to: function(value){return Math.round(parseInt(value))}}}
                />
        </div>
    </div>
</div>
)

}