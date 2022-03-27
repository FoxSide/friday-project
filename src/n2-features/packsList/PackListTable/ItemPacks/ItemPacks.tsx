import s from "./ItemPacks.module.css";
import {NavLink, useNavigate} from "react-router-dom";
import React from "react";
import {cardPacksType} from "../../../../n1-main/m2-bll/a2-reducers/pack-list-reducer";

type PropsType = {
    pack: cardPacksType
    id: string
    name: string
    cardsCount: number
    updated: string
    userName: string
    onDeleteCallBack?: () => void,
    onEditCallBack?: () => void,
    OwnerId?: string
    UserId?: string | null
}
export const ItemPacks = ({
                              id,
                              name,
                              cardsCount,
                              updated,
                              userName,
                              onDeleteCallBack,
                              onEditCallBack,
                              OwnerId,
                              UserId,
                              pack,
                          }: PropsType) => {
    let date = updated.substring(0, 10)
    const navigate = useNavigate()
    const onclickHandler = () => {
        navigate(`/question/${id}`)
    }

    const isMyPack = UserId === pack.user_id

    return (
        <div
            className={s.pack}
            key={id}
        >
            <NavLink to={`/cards/${id}`} className={s.packInfo}>
                <div className={s.packsBlockLarge}>{name}</div>
                <div className={s.packsBlockSmall}>{cardsCount}</div>
                <div className={s.packsBlockMedium}>{date}</div>
                <div className={s.packsBlockMedium}>{userName}</div>
            </NavLink>

            <div className={s.packsBlockLarge}>
                <div className={s.packButtons}>
                    <button
                        className={s.buttonDelete}
                        onClick={onDeleteCallBack}
                        disabled={!isMyPack}
                        style={{opacity: !isMyPack ? '0.3' : ''}}
                    >
                        Delete
                    </button>
                    <button onClick={onEditCallBack}
                            disabled={!isMyPack}
                            style={{opacity: !isMyPack ? '0.3' : ''}}
                    >Edit
                    </button>
                    <button onClick={onclickHandler}>Learn</button>
                </div>
            </div>
        </div>)
}