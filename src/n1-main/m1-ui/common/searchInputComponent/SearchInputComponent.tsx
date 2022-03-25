import React, {ChangeEvent} from "react";

type PropsType = {
    callBack: (value:any) => void
    className?: any
}

export const SearchInputComponent = ({callBack, className}:PropsType) => {

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        callBack(e.currentTarget.value)
    }
    return (
        <>
        <input className={className} type="text" placeholder={'Search...'} onChange={onChange}/>
        </>
    )
}

