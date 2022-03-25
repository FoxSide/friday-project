import s from "./ItemPacks.module.css";
import {NavLink, useNavigate} from "react-router-dom";
import React from "react";

type PropsType = {
    id: string
    name: string
    cardsCount: number
    updated: string
    userName: string
    deleteMyPackCallBack?: () => void,
    OwnerId?: string
    UserId?: string | null
}
export const ItemPacks = ({
                              id,
                              name,
                              cardsCount,
                              updated,
                              userName,
                              deleteMyPackCallBack,
                              OwnerId,
                              UserId
                          }: PropsType) => {
   let date = updated.substring(0, 10)
  const navigate = useNavigate()
  const onclickHandler = () => {
     navigate(`/question/${id}`)
  }

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
                  onClick={deleteMyPackCallBack}
               >
                  Delete
               </button>
               <button>Edit</button>
               <button onClick={onclickHandler}>Learn</button>
            </div>
         </div>
      </div>)
}