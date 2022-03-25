import {questionApi} from "../../m3-dal/question-api";
import {Dispatch} from "redux";
import {setAppStatusAC, setIsInitializedAC} from "./app-reducer";

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

type ActionType = ReturnType<typeof setCardsAC> | ReturnType<typeof setCardsGradeAC>

const initialState = {
  cards: [],
  cardsTotalCount: 0,
  maxGrade: 0,
  minGrade: 0,
  page: 0,
  pageCount: 0,
  packUserId: ''
}

export const questionReducer = (state: InitislStateType = initialState, action: ActionType) => {
  switch (action.type) {
    case "QUESTION/SET_CARDS":
      return {...state, ...action.data}
    case "CARDS/SET_CARDS_GRADE":
      return {
        ...state, cards: state.cards.map(m => m._id === action.updatedGrade.card_id
          ? {...m, shots: action.updatedGrade.shots, grade: action.updatedGrade.grade}
          : m)
      }
    default:
      return state
  }
}

const setCardsAC = (data: InitislStateType) => {
  return {
    type: 'QUESTION/SET_CARDS',
    data
  } as const
}

export const setCardsGradeAC = (updatedGrade: UpdatedGradeCardType) => {
  return {
    type: 'CARDS/SET_CARDS_GRADE',
    updatedGrade
  } as const
}

export const getCardsTC = (id: string | undefined, pageCount: number) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC("loading"))
  questionApi.getCards(id, pageCount)
    .then(res => {
      dispatch(setCardsAC(res.data))
      dispatch(setAppStatusAC("succeeded"))
    })
}

export const cardsGradeTC = (cardId: string, grade: number) =>
  (dispatch: Dispatch) => {
    const data: GetCardsGrade = {
      grade: grade,
      card_id: cardId
    }
    dispatch(setAppStatusAC("loading"))
    questionApi.updateCardsGrade(data)
      .then((res) => {
        dispatch(setCardsGradeAC(res.data.updatedGrade));
        dispatch(setAppStatusAC("succeeded"))
      })
      .finally(() => {
        dispatch(setAppStatusAC('failed'))
      })
  };

export type GetCardsGrade = {
  grade: number,
  card_id: string
}