import React, {useState} from 'react';
import s from "./CardsAreMissing.module.css"
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../../../n1-main/m2-bll/a1-redux-store/store";
import Modal from "../../../../../n1-main/m1-ui/common/Modal/Modal";
import {EditCard} from "../../../../f5-editCard/EditCard";

export const CardsAreMissing = () => {
   const [show, setShow] = useState(false);

   const userId = useSelector<AppRootStateType, string | undefined>((state) => state.profile?._id)
   const packUserId = useSelector<AppRootStateType, string>((state) => state.cards.packUserId)
   const button = userId && userId === packUserId &&
     <div>
       <button onClick={() => setShow(true)}>Add card</button>
     </div>
   return (
      <div className={s.cardsAreMissing}>
         <p>Cards are missing</p>
         { button }
         <Modal
            enableBackground={true}
            backgroundOnClick={() => setShow(false)}

            width={300}
            height={200}

            show={show}
         >
            <EditCard setEditMode={setShow}/>
         </Modal>
      </div>
   );
};
