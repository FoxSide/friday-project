import React, {useState} from 'react';
import Rating from "react-rating";
import s from "./CardItem.module.css";
import {BsStar, BsStarFill} from "react-icons/bs";
import {EditCard} from "../../../../../f5-editCard/EditCard";
import Modal from "../../../../../../n1-main/m1-ui/common/Modal/Modal";

export const CardItem: React.FC<CardItemType> = (props) => {
   const {
      cardId,
      index,
      grade,
      answer,
      question,
      lastUpdated,
      actionColumn,
   } = props;
   const [show, setShow] = useState(false);
   const backgroundColor = index % 2 !== 0 ? "#fff" : "#F8F7FD";

   const date = new Date((Date.parse(lastUpdated)));
   const formattedDate = `${date.getDay()}.${date.getMonth()}.${date.getFullYear()}`;

   const onEditButtonHandle = () => {
      setShow(true)
   }

   const modal =
      <>
         <Modal
            enableBackground={false}
            backgroundOnClick={() => setShow(false)}

            modalStyle={{
               top: "50%",
               left: "50%",
            }}

            width={0}
            height={0}

            show={show}
         >
            <EditCard setEditMode={setShow} cardId={cardId}/>
         </Modal>
      </>

   return (
      <div className={s.cardItem} style={{backgroundColor: backgroundColor}}>
         <div className={s.question}>{question}</div>
         <div className={s.answer}>{answer}</div>
         <div className={s.lastUpdated}>{formattedDate}</div>
         <div className={s.grade}>
            <Rating
               readonly
               initialRating={grade}
               emptySymbol={<BsStar/>}
               fullSymbol={<BsStarFill/>}
            />
         </div>
         {actionColumn &&
         <div className={s.actions}>
           <button
             className={s.deleteCardButton}
           >
             Delete
           </button>
           <button
             className={s.editCardButton}
             onClick={onEditButtonHandle}
           >
             Edit
           </button>
           <button className={s.learnCardButton}>Learn</button>
         </div>
         }
         {modal}
      </div>
   );
};

type CardItemType = {
   cardId: string;
   index: number;
   grade: number;
   answer: string;
   question: string;
   lastUpdated: string;
   actionColumn: boolean;
};
