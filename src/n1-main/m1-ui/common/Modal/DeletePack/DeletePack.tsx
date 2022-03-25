import React, {FC} from "react";
import s from './DeletePack.module.css'


type PropsType = {
    onDelete: () => void
    onCancel?: () => void
    packData: {
        name: string,
        packId: string
    }
}

export const DeletePack: FC<PropsType> = ({
                                              onDelete,
                                              onCancel,
                                              packData
                                          }) => {


    return (
        <div className={s.wrapp}>
            <div className={s.header}>
                <h3>Delete Pack</h3>
            </div>
            <div className={s.description}>
                <p>Do you really want to remove <b>{packData.name}?</b></p>
                <p>All cards will be excluded from this course</p>
            </div>
            <div className={s.buttonBlock}>
                <button onClick={onCancel}>Cancel</button>
                <button onClick={onDelete}>Delete</button>
            </div>
        </div>
    )
}