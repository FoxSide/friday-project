import axios, {AxiosResponse} from "axios";
import {CardsStateType} from "../m2-bll/a2-reducers/cards-reducer";

const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    // baseURL: 'https://neko-back.herokuapp.com/2.0/' ,
    withCredentials: true
});

export const cardsAPI = {
    getCardsByPackId(packId: string, sortCards: string, page: number, pageCount: number) {
        return instance
            .get<{}, AxiosResponse<CardsStateType>>(`cards/card?&cardsPack_id=${packId}&sortCards=${sortCards}&page=${page}&pageCount=${pageCount}`)
            .then(res => res.data);
    },
    updateCard(data: UpdateCardDataType) {
        return instance
            .post(`cards/card`, data)
            .then(res => res.data);
    },
};


export type UpdateCardDataType = {
    _id: string;
    question: string;
    answer: string;
};
