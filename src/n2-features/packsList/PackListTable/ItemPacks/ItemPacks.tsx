import s from "./ItemPacks.module.css";
import React from "react";
import {NavLink} from "react-router-dom";

type PropsType = {
   id: string
   name: string
   cardsCount: number
   updated: string
   userName: string
   deleteMyPackCallBack?: () => void
}
export const ItemPacks = ({
                             id,
                             name,
                             cardsCount,
                             updated,
                             userName,
                             deleteMyPackCallBack,
                          }: PropsType) => {
   let date = updated.substring(0, 10)
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
               <button>Learn</button>
            </div>
         </div>
      </div>)
}