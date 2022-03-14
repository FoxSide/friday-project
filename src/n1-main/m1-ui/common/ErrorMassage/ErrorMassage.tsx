import style from './ErrorMassage.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../m2-bll/a1-redux-store/store";
import {SvgSelector} from "../SvgSelector/SvgSelector";
import {setAppErrorAC, setAppSuccessAC} from "../../../m2-bll/a2-reducers/error-reducer";
import {useEffect} from "react";

export const ErrorMassage = () => {

    const error = useSelector<AppRootStateType>(state => state.error.error)
    const dispatch = useDispatch()
    const hideMessage = () => {
        dispatch(setAppErrorAC(null))
    }
    useEffect(()=> {
        if (error) {
            setTimeout(()=> {
                dispatch(setAppErrorAC(null))
            }, 16000)}
    }, [error])

    if (!error) {
        return <></>
    }
    return (
        <div className={style.container}>
            <div className={style.xIcon} onClick={hideMessage}>
                <SvgSelector id={'XIcon'}/>
            </div>
            Error: {error}
        </div>
    )
}