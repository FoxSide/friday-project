import style from './SuccessMassage.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../m2-bll/a1-redux-store/store";
import {SvgSelector} from "../SvgSelector/SvgSelector";
import {setAppErrorAC, setAppSuccessAC} from "../../../m2-bll/a2-reducers/error-reducer";
import {useEffect} from "react";

export const SuccessMassage = () => {

    const success = useSelector<AppRootStateType>(state => state.error.success)
    const dispatch = useDispatch()

    useEffect(()=> {
        if (success) {
        setTimeout(()=> {
            dispatch(setAppSuccessAC(null))
        }, 8000)}
    }, [success])

    if (!success) {
        return <></>
    }
    return (
        <div className={style.container}>
            <div className={style.xIcon}>
            </div>
            Success: {success}
        </div>
    )
}