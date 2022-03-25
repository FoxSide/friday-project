import {instance} from "./a1-instance-api";
import {AxiosResponse} from "axios";
import {CardsStateType} from "../m2-bll/a2-reducers/cards-reducer";

export const questionApi = {
  getCards(packID: string | undefined, pageCount: number) {
    return instance.get<{}, AxiosResponse<CardsStateType>>(`cards/card?&cardsPack_id=${packID}&pageCount=${pageCount}`)
  }
}