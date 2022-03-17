import {useState} from "react";
import Nouislider from "nouislider-react";
import 'nouislider/dist/nouislider.css';
import s from './DoubleRange.module.css'
import './NouisliderCustom.css'

type PropsType = {
    min: number
    max: number
    setMax: (value:number)=>void
    setMin: (value:number)=>void
}

export const DoubleRange = ({min, max, setMin, setMax}: PropsType) => {
    // const [value1, setValue1] = useState(0)
    // const [value2, setValue2] = useState(100)


    const onChangeRangeDouble = (e: number[]) => {
        setMin(Math.round(e[0]))
        setMax(Math.round(e[1]))
    }

    return (
<div className={s.container}>
    <p>Number of cards</p>
    <div>
        <div className={s.blockSlider}>
                <Nouislider range={{min: 0, max: 100}}
                            start={[min, max]}
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