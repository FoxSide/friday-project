import {AddPackListRequestType, packListAPI, packListRequestType} from "../../m3-dal/packList-api";
import {Dispatch} from "redux";
import {setAppStatusAC, SetAppStatusActionType} from "./app-reducer";
import {setAppErrorAC, SetAppErrorType, SetAppSuccessType} from "./error-reducer";
import {AppRootStateType} from "../a1-redux-store/store";

const initialState: PackListStateType = {
    cardPacks: [],
    cardPacksTotalCount: 100,
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 1,
    pageCount: 5,
    isMyPacks: false,
    sortPacks: '',
    maxFilter: 0,
    minFilter: 0,
    searchName: '',
}

export const packListReducer = (state: PackListStateType = initialState, action: ActionsType): PackListStateType => {

    switch (action.type) {
        case 'PACK-LIST/SET-PACKS':
        case 'PACK-LIST/SET-CURRENT-PACKS_PAGE':
        case 'PACK-LIST/SET-COUNT-ITEMS-PACKS-ON-PAGE':
        case 'PACK-LIST/SET-IS-MY-PACKS':
        case 'PACK-LIST/SET-SORT-PACKS-ON-PAGE':
        case 'PACK-LIST/SET-RANGE-CARDS-IN-PACKS':
        case "PACK-LIST/SET-NEW-PACK":
        case "PACK-LIST/SET-SEARCH_NAME":
            return {
                ...state,
                ...action.payload
            }
        case 'PACK-LIST/FILTERING-RANGE-CARDS-IN-PACKS':
            return {
                ...state,
                cardPacks: [...state.cardPacks.filter(cards => cards.cardsCount >= action.payload.minFilter && cards.cardsCount <= action.payload.maxFilter)]
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
        payload: {page: currentPage}
    } as const
}

export const setCountItemsPacksOnPage = (countItemsOnPage: number) => {
    return {
        type: "PACK-LIST/SET-COUNT-ITEMS-PACKS-ON-PAGE",
        payload: {pageCount: countItemsOnPage}
    } as const
}

export const setIsMyPacks = (isMyPacks: boolean) => {
    return {
        type: 'PACK-LIST/SET-IS-MY-PACKS',
        payload: {isMyPacks: isMyPacks}
    } as const
}

export const setRangeCadsInPacks = (min: number, max: number) => {
    return {
        type: 'PACK-LIST/SET-RANGE-CARDS-IN-PACKS',
        payload: {maxFilter: max, minFilter: min,}
    } as const
}
export const filteringRangeCadsInPacks = (min: number, max: number) => {
    return {
        type: 'PACK-LIST/FILTERING-RANGE-CARDS-IN-PACKS',
        payload: {maxFilter: max, minFilter: min,}
    } as const
}

export const setSortPacksOnPage = (sortPacks: string) => {
    return {
        type: 'PACK-LIST/SET-SORT-PACKS-ON-PAGE',
        payload: {sortPacks: sortPacks,}
    } as const
}

export const setSearchName = (searchName: string) => {
    return {
        type: 'PACK-LIST/SET-SEARCH_NAME',
        payload: {searchName}
    } as const
}

export const setNewPack = (name: string) => {
    return {
        type: 'PACK-LIST/SET-NEW-PACK',
        payload: {name}
    } as const
}


//thunk
export const addNewPackTC = (name: string) => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC("loading"))
    try {
        let res = await packListAPI.addNewPack({cardsPack: {name}});
        //@ts-ignore
        dispatch(getPacksTC())
        dispatch(setAppStatusAC("succeeded"))
    } catch (e: any) {
        dispatch(setAppErrorAC(e.response.data.error))
        dispatch(setAppStatusAC('failed'))
    }
}

export const getPacksTC = (userId: string | null) => async (dispatch: Dispatch<ActionsType>,
                                                            getState: () => AppRootStateType) => {
    const {isMyPacks, ...data} = getState().packList
    dispatch(setAppStatusAC("loading"))
    try {
        let apIModel
        if (!isMyPacks) {
            apIModel = {
                min: data.minFilter,
                max: data.maxFilter,
                sortPacks: data.sortPacks,
                page: data.page,
                pageCount: data.pageCount,
                packName: data.searchName,
            }
        } else {
            apIModel = {
                min: data.minFilter,
                max: data.maxFilter,
                sortPacks: data.sortPacks,
                page: data.page,
                pageCount: data.pageCount,
                packName: data.searchName,
                user_id: userId,
            }
        }
        let res = await packListAPI.getPacks(apIModel);
        if (data.maxFilter == 0) {
            dispatch(setRangeCadsInPacks(data.minFilter, res.data.maxCardsCount))

        }
        dispatch(setPacksAC(res.data))
        dispatch(filteringRangeCadsInPacks(data.minFilter, data.maxFilter))
        // dispatch(setPacksAC(res.data))


        // console.log(res.data)
        dispatch(setAppStatusAC("succeeded"))
    } catch (e: any) {
        dispatch(setAppErrorAC(e.response.data.error))
        dispatch(setAppStatusAC('failed'))
    }
}

type AdditionalPackListStateType = {
    isMyPacks: boolean,
    sortPacks: string,
    maxFilter: number,
    minFilter: number,
    searchName: string,
}

export type PackListStateType = AdditionalPackListStateType & {
    cardPacks: cardPacksType[],
    cardPacksTotalCount: number,
    maxCardsCount: number,
    minCardsCount: number,
    page: number,
    pageCount: number,
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
    | SetCurrentPacksPageType
    | SetCountItemsPacksOnPageType
    | SetIsMyPacksType
    | SetRangeCadsInPacksType
    | SetSortPacksOnPageType
    | SetAppErrorType
    | SetAppStatusActionType
    | SetAppSuccessType
    | FilteringRangeCadsInPacksPageType
    | SetNewPackType
    | SetSearchNamePageType

export type SetPacksType = ReturnType<typeof setPacksAC>
export type SetCurrentPacksPageType = ReturnType<typeof setCurrentPacksPage>
export type SetCountItemsPacksOnPageType = ReturnType<typeof setCountItemsPacksOnPage>
export type SetIsMyPacksType = ReturnType<typeof setIsMyPacks>
export type SetRangeCadsInPacksType = ReturnType<typeof setRangeCadsInPacks>
export type SetSortPacksOnPageType = ReturnType<typeof setSortPacksOnPage>
export type SetNewPackType = ReturnType<typeof setNewPack>
export type FilteringRangeCadsInPacksPageType = ReturnType<typeof filteringRangeCadsInPacks>
export type SetSearchNamePageType = ReturnType<typeof setSearchName>