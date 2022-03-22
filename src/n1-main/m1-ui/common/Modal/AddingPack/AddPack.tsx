import SuperInputText from "../../super-input-text/SuperInputText";
import React, {ComponentProps, useState, VFC} from "react";

type PropsType = {
    onSave: (name: string) => void
    onCancel?: () => void
}

export const AddPack: VFC<PropsType> = ({onSave, onCancel}) => {

    const [name, setName] = useState<string>('')

    const onChangeHandler: ComponentProps<typeof SuperInputText>['onChangeText'] = (value) => {
        setName(value)
    }

    const onSaveCallBack = () => {
        onSave(name)
    }

    return (
        <div>
            <h3>Add new pack</h3>
            <SuperInputText onChangeText={onChangeHandler} value={name}/>
            <button onClick={onCancel}>Cancel</button>
            <button disabled={name === ''} onClick={onSaveCallBack}>Save</button>
        </div>
    )
}