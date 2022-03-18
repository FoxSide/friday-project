import {packListAPI, packListRequestType} from "../../m3-dal/packList-api";
import {Dispatch} from "redux";
import {setAppStatusAC, SetAppStatusActionType} from "./app-reducer";
import {setAppErrorAC, SetAppErrorType, SetAppSuccessType} from "./error-reducer";
import {AppRootStateType} from "../a1-redux-store/store";

const initialState: PackListStateType = {
    cardPacks: [],
    cardPacksTotalCount: 100,
    maxCardsCount: 100,
    minCardsCount: 0,
    page: 1,
    pageCount: 5,
    user_id: '',
    isMyPacks: false,
    sortPacks: "0grade",
}

export const packListReducer = (state: PackListStateType = initialState, action: ActionsType): PackListStateType => {

    switch (action.type) {
        case 'PACK-LIST/SET-PACKS':
        case 'PACK-LIST/SET-CURRENT-PACKS_PAGE':
        case 'PACK-LIST/SET-COUNT-ITEMS-PACKS-ON-PAGE':
        case 'PACK-LIST/SET-IS-MY-PACKS':
        case 'PACK-LIST/SET-RANGE-CARDS-IN-PACKS':
        case 'PACK-LIST/SET-SORT-PACKS-ON-PAGE':
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
};

export const setPacksAC = (dataResponse: PackListStateType) => {
    return {
        type: 'PACK-LIST/SET-PACKS',
           payload: {...dataResponse}
    } as const
}

export const setCurrentPacksPage = (currentPage: number) => {
    return {
        type: 'PACK-LIST/SET-CURRENT-PACKS_PAGE',
        payload: {page: currentPage }
    } as const
}

export const setCountItemsPacksOnPage = (countItemsOnPage: number) => {
    return {
        type: "PACK-LIST/SET-COUNT-ITEMS-PACKS-ON-PAGE",
        payload: { pageCount: countItemsOnPage }
    } as const
}

export const setIsMyPacks = (isMyPacks: boolean) => {
    return {
        type: 'PACK-LIST/SET-IS-MY-PACKS',
        payload: { isMyPacks: isMyPacks }
    } as const
}

export const setRangeCadsInPacks = (min: number, max: number) => {
    return {
        type: 'PACK-LIST/SET-RANGE-CARDS-IN-PACKS',
        payload: { maxCardsCount: max,  minCardsCount: min,}
    } as const
}
export const setSortPacksOnPage = (sortPacks: string) => {
    return {
        type: 'PACK-LIST/SET-SORT-PACKS-ON-PAGE',
        payload: { sortPacks: sortPacks,}
    } as const
}

export const getPacksTC = () => async (dispatch: Dispatch<ActionsType>,
                                                              getState: () => AppRootStateType) => {
    const {isMyPacks, ...data} = getState().packList
    dispatch(setAppStatusAC("loading"))
    try {
        let apIModel
        if(!isMyPacks) {
            apIModel = {
                min: data.minCardsCount,
                max: data.maxCardsCount,
                sortPacks: data.sortPacks,
                page: data.page,
                pageCount: data.pageCount
            }
        } else {
            apIModel = {
                min: data.minCardsCount,
                max: data.maxCardsCount,
                sortPacks: data.sortPacks,
                page: data.page,
                pageCount: data.pageCount,
                user_id: data.user_id
            }
        }
        let res = await packListAPI.getPacks(apIModel);
        dispatch(setPacksAC(res.data))
        // console.log(res.data)
        dispatch(setAppStatusAC("succeeded"))
    } catch (e: any) {
        dispatch(setAppErrorAC(e.response.data.error))
        dispatch(setAppStatusAC('failed'))
    }
}

// export const UpdatePacksTC = ()=> () => {
//
// }

type AdditionalPackListStateType = {
    isMyPacks: boolean
    sortPacks: string
}

export type PackListStateType = AdditionalPackListStateType & {
    cardPacks: cardPacksType[],
    cardPacksTotalCount: number,
    maxCardsCount: number,
    minCardsCount: number,
    page: number,
    pageCount: number,
    user_id: string,

}

export type cardPacksType = {
    _id: string
    user_id: string
    name: string
    cardsCount: number
    created: string
    updated: string
    user_name: string
}

type ActionsType = SetPacksType
    |SetCurrentPacksPageType
    |SetCountItemsPacksOnPageType
    |SetIsMyPacksType
    |SetRangeCadsInPacksType
    |SetSortPacksOnPageType
    | SetAppErrorType
    | SetAppStatusActionType
    | SetAppSuccessType

export type SetPacksType = ReturnType<typeof setPacksAC>
export type SetCurrentPacksPageType = ReturnType<typeof setCurrentPacksPage>
export type SetCountItemsPacksOnPageType = ReturnType<typeof setCountItemsPacksOnPage>
export type SetIsMyPacksType = ReturnType<typeof setIsMyPacks>
export type SetRangeCadsInPacksType = ReturnType<typeof setRangeCadsInPacks>
export type SetSortPacksOnPageType = ReturnType<typeof setSortPacksOnPage>
