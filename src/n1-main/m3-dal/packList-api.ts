import axios from "axios";

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true,
})

export const packListAPI = {
    getPacks(data: packListRequestType) {
        return instance.get<packListResponseType>('cards/pack', {
            params: data
        })
    }
}

export type  packListRequestType = {
    min?: number,
    max?: number,
    sortPacks?: string,
    page: number,
    pageCount: number,
    user_id?: string
}

export type packListResponseType = {
    cardPacks: packListCardPacks[]
    cardPacksTotalCount: number | null
    maxCardsCount: number | null
    minCardsCount: number | null
    page: number | null
    pageCount: number | null
    // token: "3d061d70-a5b4-11ec-8630-b7dd9536b5df"
    // tokenDeathTime: 1647506207815
}

export type packListCardPacks = {
    _id: string
    user_id: string
    name: string
    cardsCount: number
    created: string
    updated: string
    user_name: string
}

// export type GetDataType = {
//     cardPacks: packListCardPacks[]
//
//     error: string
// }

//min: number, max: number, sortPacks: string = '0updated', page: number, pageCount: number, user_id: string