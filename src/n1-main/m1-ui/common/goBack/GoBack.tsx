import React from "react";
import s from "./GoBack.module.css";
import {useNavigate} from "react-router-dom";
import {path} from "../../routes/Routes";

export const GoBack = () => {
   const navigate = useNavigate();

   const onBackButtonHandle = () => {
      navigate(path.packList);
   }

   return (
      <div
         onClick={onBackButtonHandle}
         className={s.wrapper}
      >
         <span className={s.goBackIcon}>{"<-"}</span>
         <span className={s.text}>Back</span>
      </div>
   );
};
