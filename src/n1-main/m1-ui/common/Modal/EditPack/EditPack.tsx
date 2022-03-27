import SuperInputText from "../../super-input-text/SuperInputText";
import React, {ComponentProps, useState, VFC} from "react";
import s from './EditPack.module.css'

type PropsType = {
    onSave: (name: string) => void
    onCancel?: () => void
    packName: string
}

export const EditPack: VFC<PropsType> = ({onSave, onCancel, packName}) => {

    const [name, setName] = useState<string>(packName)

    const onChangeHandler: ComponentProps<typeof SuperInputText>['onChangeText'] = (value) => {
        setName(value)
    }

    const onSaveCallBack = () => {
        onSave(name)
    }

    return (
        <div className={s.wrapp}>
            <div className={s.header}>
                <h3>Edit pack</h3>
            </div>
            <SuperInputText className={s.input}
                            onChangeText={onChangeHandler}
                            placeholder={'name pack'}
                            value={name}
            />
            <div className={s.buttonBlock}>
                <button onClick={onCancel}>Cancel</button>
                <button disabled={name === ''} onClick={onSaveCallBack}>Save</button>
            </div>
        </div>
    )
}