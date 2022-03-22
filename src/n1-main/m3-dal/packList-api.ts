import {instance} from "./a1-instance-api";
import {PackListStateType} from "../m2-bll/a2-reducers/pack-list-reducer";

export const packListAPI = {
    getPacks(data: packListRequestType) {
        return instance.get<PackListStateType>('cards/pack', {
            params: data
        })
    },

    addNewPack(data: AddPackListRequestType) {
        return instance.post(`cards/pack`,{...data})
    }
}

export type  packListRequestType = {
    min?: number,
    max?: number,
    sortPacks?: string,
    page?: number,
    pageCount?: number,
    user_id?: string
}

export type AddPackListRequestType = {
    cardsPack: {
        name?: string
        deckCover?: string
        private?: boolean
    }
}

// export type packListResponseType = {
//     cardPacks: packListCardPacks[]
//     cardPacksTotalCount: number | null
//     maxCardsCount: number | null
//     minCardsCount: number | null
//     page: number | null
//     pageCount: number | null
//     // token: "3d061d70-a5b4-11ec-8630-b7dd9536b5df"
//     // tokenDeathTime: 1647506207815
// }
//
// export type packListCardPacks = {
//     _id: string
//     user_id: string
//     name: string
//     cardsCount: number
//     created: string
//     updated: string
//     user_name: string
// }

// export type GetDataType = {
//     cardPacks: packListCardPacks[]
//
//     error: string
// }

//min: number, max: number, sortPacks: string = '0updated', page: number, pageCount: number, user_id: string