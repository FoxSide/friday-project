import Nouislider from "nouislider-react";
import 'nouislider/dist/nouislider.css';
import s from './DoubleRange.module.css'
import './NouisliderCustom.css'

type PropsType = {
    maxCardsCount: number
    minCardsCount: number
    setRangeCadsInPacksCallBack: (min: number, max: number) => void
    maxFilter: number,
    minFilter: number,
}

export const DoubleRange = ({maxCardsCount, minCardsCount, setRangeCadsInPacksCallBack, maxFilter, minFilter}: PropsType) => {
    console.log(maxCardsCount, minCardsCount)


    const onChangeRangeDouble = (e: number[]) => {
        console.log('Из компоненты мин, макс: ', Math.round(e[0]), Math.round(e[1]))
        setRangeCadsInPacksCallBack(Math.round(e[0]), Math.round(e[1]))
    }

    return (
<div className={s.container}>
    <p>Number of cards</p>
    <div>
        <div className={s.blockSlider}>
                <Nouislider range={{min: minCardsCount, max: maxCardsCount}}
                            start={[String(minFilter), String(maxFilter)]}
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