import {questionApi} from "../../m3-dal/question-api";
import {Dispatch} from "redux";

type InitislStateType = {
  cards: Array<CardType>
  cardsTotalCount: number
  maxGrade: number
  minGrade: number
  page: number
  pageCount: number
  packUserId: string
}

export type CardType = {
  answer: string
  question: string
  cardsPack_id: string
  grade: number
  shots: number
  user_id: string
  created: string
  updated: string
  _id: string
}

export type UpdatedGradeCardType = {
  _id: string
  cardsPack_id: string
  card_id: string
  user_id: string
  grade: number
  shots: number
}

type ActionType = ReturnType<typeof setCardsAC>


export type TNullable<T> = T | null | undefined

const initialState = null

export const questionReducer = (state: TNullable<InitislStateType> = initialState, action: ActionType) => {
  switch (action.type) {
    case "QUESTION/SET_CARDS":
      return {...state, ...action.data}
    default:
      return state
  }
}

const setCardsAC = (data: InitislStateType) => {
  return {
    type: 'QUESTION/SET_CARDS',
    data
  }
}

export const getCardsTC = (id: string | undefined, pageCount: number) => (dispatch: Dispatch<ActionType>) => {
  questionApi.getCards(id, pageCount)
    .then(res => {
      dispatch(setCardsAC(res.data))
    })
}