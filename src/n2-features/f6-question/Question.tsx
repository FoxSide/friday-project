import React, {useEffect, useState} from 'react';
import s from './Question.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../n1-main/m2-bll/a1-redux-store/store";
import {Navigate, useParams} from "react-router-dom";
import {CardType, getCardsTC} from "../../n1-main/m2-bll/a2-reducers/question-reduser";

const grades = ['Did not know', 'Forgot', 'A lot of thought', 'Confused', 'Knew the answer']

const getCard = (cards: CardType[]) => {
  const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
  const rand = Math.random() * sum;
  const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
      const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
      return {sum: newSum, id: newSum < rand ? i : acc.id}
    }
    , {sum: 0, id: -1});
  console.log('test: ', sum, rand, res)

  return cards[res.id + 1];
}

export const Question = () => {
  const [first, setFirst] = useState<boolean>(true);
  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
  const cards = useSelector((state: AppRootStateType) => state.questionReducer?.cards)
  const dispatch = useDispatch()
  const {packID} = useParams()
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [pageValue, setPageValue] = useState<number>(0)
  const [grade, setGrade] = useState<number>(0)
  console.log(grade)

  const [card, setCard] = useState<CardType>({
    user_id: "",
    _id: 'fake',
    cardsPack_id: '',
    answer: 'answer fake',
    question: 'question fake',
    grade: 0,
    shots: 0,
    created: '',
    updated: ''
  });

  useEffect(() => {
    if (first) {
      dispatch(getCardsTC(packID, 100))
      setFirst(false)
    }
    // @ts-ignore
    if (cards?.length > 0) setCard(getCard(cards))
  }, [dispatch, packID, cards, first])

  const onClickNextHandler = () => {
    setIsChecked(false);
    // @ts-ignore
    if (cards?.length > 0) setCard(getCard(cards));
    else {

    }
  }
  const onClickBackHandler = () => {
    if (pageValue > 0) {
      setPageValue(pageValue - 1)
    }
  }

  const onClickGradeHandler = (i: number) => {
    setGrade(i + 1)
  }

  if (!isLoggedIn) {
    return <Navigate to={'/login'}/>
  }

  return (
    <div className={s.wrapp}>
      <>
        <div className={s.titleContainer}>
          <h2>Learn page</h2>
        </div>
        <div className={s.questionContainer}>
          <span className={s.answer}><b>Question:</b> {card.question}</span>
          {isChecked &&
            <>
              <span className={s.answer}><b>Answer:</b> {card.answer}</span>
              <span className={s.answer}><b>Rate yourself:</b></span>
              <div className={s.radioContainer}>
                {grades.map((e, i) => (
                  <div key={'grade-' + i} className={s.radio}><input name={'answer'} type="radio"
                                                                     onClick={() => onClickGradeHandler(i)}/>{e}</div>
                ))}
              </div>
            </>
          }
        </div>
        {!isChecked ?
          <div className={s.buttonsContainer}>
            <button className={s.button} onClick={onClickBackHandler}>Cancel</button>
            <button className={s.button} onClick={() => (setIsChecked(!isChecked))}>Show Answer</button>
          </div> :
          <div className={s.buttonsContainer}>
            <button className={s.button} onClick={() => (setIsChecked(false))}>Cancel</button>
            <button className={s.button} onClick={onClickNextHandler}>Next</button>
          </div>
        }
      </>
    </div>
  );
};