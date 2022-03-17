import React from "react";
import s from "./GoBack.module.css";

export const GoBack = () => {
  // const history = useHistory();

  return (
    <div onClick={() => {}} className={s.wrapper}>
      <span className={s.goBackIcon}>{"<-"}</span>
      <span className={s.text}>Back</span>
    </div>
  );
};
