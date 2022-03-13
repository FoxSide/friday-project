import style from './ErrorMassage.module.css'
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../m2-bll/a1-redux-store/store";

export const ErrorMassage = () => {

    const error = useSelector<AppRootStateType>(state => state.error.error)

    if (!error) {
        return <></>
    }
    return (
        <div className={style.container}>
            Error: {error}
        </div>
    )
}