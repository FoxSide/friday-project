import React, {ChangeEvent} from "react";

type PropsType = {
    callBack: (value:string) => void
}

export const SearchInputComponent = ({callBack}:PropsType) => {

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        callBack(e.currentTarget.value)
    }
    return (
        <>
        <input type="text" placeholder={'Search...'} onChange={onChange}/>
        </>
    )
}

