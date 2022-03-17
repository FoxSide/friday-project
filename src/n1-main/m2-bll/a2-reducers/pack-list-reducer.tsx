import {packListAPI, packListCardPacks, packListRequestType, packListResponseType} from "../../m3-dal/packList-api";
import {Dispatch} from "redux";
import {setAppStatusAC, SetAppStatusActionType} from "./app-reducer";
import {setIsLoadingAC} from "./password-recovery-reducer";
import {authAPI} from "../../m3-dal/setNewPassword-api";
import {setAppErrorAC, SetAppErrorType, setAppSuccessAC, SetAppSuccessType} from "./error-reducer";
import {setIsSetNewPasswordAC} from "./new-password-reducer";
const initialState: packListResponseType = {
    cardPacks: [],
    cardPacksTotalCount: null,
    maxCardsCount: null,
    minCardsCount: null,
    page: null,
    pageCount: null,
}

export const packListReducer = (state: packListResponseType = initialState, action: ActionsType): packListResponseType => {

    switch (action.type) {
        case 'PACK-LIST/GET-PACKS':
            return {
                ...state,
                ...action.dataResponse
            }
        default:
            return state
    }
};

export const getPacksAC = (dataResponse: packListResponseType) => {
    return {
        type: 'PACK-LIST/GET-PACKS',
            dataResponse
    } as const
}

export const setPacksTC = (data: packListRequestType) => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC("loading"))
    try {
        let res = await packListAPI.getPacks(data);
        dispatch(getPacksAC(res.data))
        // console.log(res.data)
        dispatch(setAppStatusAC("succeeded"))
    } catch (e: any) {
        dispatch(setAppErrorAC(e.response.data.error))
        dispatch(setAppStatusAC('failed'))
    }
}

// type InitialStateType = packListResponseType
type ActionsType = GetPacksType
    | SetAppErrorType
    | SetAppStatusActionType
    | SetAppSuccessType

export type GetPacksType = ReturnType<typeof getPacksAC>
