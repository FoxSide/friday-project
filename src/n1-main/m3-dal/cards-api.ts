import {AxiosResponse} from "axios";
import {CardsStateType} from "../m2-bll/a2-reducers/cards-reducer";
import {instance} from "./a1-instance-api";


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
