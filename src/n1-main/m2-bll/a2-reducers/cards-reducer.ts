import {ActionCreator} from "redux";
import {setAppStatusAC, SetAppStatusActionType} from "./app-reducer";
import {SetAppErrorType, SetAppSuccessType} from "./error-reducer";
import {AppRootStateType} from "../a1-redux-store/store";
import {cardsAPI, CreateCardDataType, UpdateCardDataType} from "../../m3-dal/cards-api";

const initialState: CardsStateType = {
    cards: [],
    cardsTotalCount: 0,
    maxGrade: 0,
    minGrade: 0,
    packUserId: "",
    page: 1,
    pageCount: 5,
    sort: "",
    cardQuestion: "",
}
export const cardsReducer = (state: CardsStateType = initialState, action: CardsReducerActionsType) => {
    switch (action.type) {
        case "SET-COUNT-ITEMS-ON-PAGE":
        case "SET-CURRENT-PAGE":
        case "SET-CARDS-DATA":
        case "SET-SEARCH_CARD_QUESTION":
        case "SET-SORT_CARD_COLUMN":
            return {
                ...state,
                ...action.payload
            }
        default: {
            return state
        }
    }
};

export const setCardsData = (data: CardsStateType) => {
    return {
        type: "SET-CARDS-DATA",
        payload: {...data}
    } as const
};

export const setCurrentPage = (currentPage: number) => {
    return {
        type: "SET-CURRENT-PAGE",
        payload: { page: currentPage }
    } as const
};

export const setSearchCardQuestion = (cardQuestion: string) => {
    return {
        type: "SET-SEARCH_CARD_QUESTION",
        payload: {cardQuestion}
    } as const
};

export const setSortCardColumn = (sort: string) => {
    return {
        type: "SET-SORT_CARD_COLUMN",
        payload: {sort}
    } as const
};

export const setCountItemsOnPage = (countItemsOnPage: number) => {
    return {
        type: "SET-COUNT-ITEMS-ON-PAGE",
        payload: { pageCount: countItemsOnPage }
    } as const
}

export const fetchingCardsData = (
    packId: string,
) =>

    async (dispatch: ActionCreator<CardsReducerActionsType>, getState: () => AppRootStateType) => {

    const {page, pageCount, sort, cardQuestion} = getState().cards
        dispatch(setAppStatusAC("loading"))
        try {
            const data: CardsStateType = await cardsAPI.getCardsByPackId(packId, sort, page, pageCount, cardQuestion);
            dispatch(setCardsData(data))
            dispatch(setAppStatusAC("succeeded"))
        } catch (e: any) {
            dispatch(setAppStatusAC('failed'))
        }
    }

export const updateCard = (packId: string, cardId: string, question: string, answer: string) =>
    async (dispatch: ActionCreator<CardsReducerActionsType>) => {
        dispatch(setAppStatusAC("loading"))
        try {
            const data: UpdateCardDataType = {
                card: {
                    _id: cardId,
                    answer,
                    question,
                }
            }
            await cardsAPI.updateCard(data)
            dispatch(fetchingCardsData(packId))
            dispatch(setAppStatusAC("succeeded"))
        } catch (e: any) {
            dispatch(setAppStatusAC('failed'))
        }
    }

export const addCard = (cardsPack_id: string, question: string, answer: string) => async (dispatch: ActionCreator<CardsReducerActionsType>) => {
    dispatch(setAppStatusAC("loading"))
    try {
        const data: CreateCardDataType = {
            card: {
                cardsPack_id,
                answer,
                question,
            }
        }
        await cardsAPI.addCard(data)
        dispatch(fetchingCardsData(cardsPack_id))
        dispatch(setAppStatusAC("succeeded"))
    } catch (e: any) {
        dispatch(setAppStatusAC('failed'))
    }
}

export type OwnCardsStateType = {
    sort: string;
    cardQuestion: string,
};

export type CardsStateType = OwnCardsStateType & {
    cards: CardType[];
    cardsTotalCount: number;
    maxGrade: number;
    minGrade: number;
    page: number;
    pageCount: number;
    packUserId: string;
};

export type CardType = {
    answer: string;
    question: string;
    cardsPack_id: string;
    grade: number;
    shots: number;
    user_id: string;
    created: string;
    updated: string;
    _id: string;
};

export type CardsReducerActionsType =
    | ReturnType<typeof setCardsData>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setCountItemsOnPage>
    | ReturnType<typeof setSearchCardQuestion>
    | ReturnType<typeof setSortCardColumn>
    | SetAppErrorType
    | SetAppStatusActionType
    | SetAppSuccessType