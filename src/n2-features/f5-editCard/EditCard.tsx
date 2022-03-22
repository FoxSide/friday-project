import React from "react";
import s from "./EditCard.module.css";
import {Preloader} from "../../n1-main/m1-ui/common/preloader/Preloader";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../n1-main/m2-bll/a1-redux-store/store";
import * as yup from "yup";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {addCard, updateCard} from "../../n1-main/m2-bll/a2-reducers/cards-reducer";
import {useParams} from "react-router-dom";

export const EditCard: React.FC<EditCardType> = (props) => {
    const { setEditMode, question, answer, cardId } = props;

    const status = useSelector<AppRootStateType>(state => state.app.status)
    const cardsTotalCount = useSelector<AppRootStateType, number>(state => state.cards.cardsTotalCount)
    const {packID} = useParams();
    const cardsPack_id = packID ? packID : "";
    const card_id = cardId ? cardId : "";

    const dispatch = useDispatch();

    const schema = yup.object({
        question: yup.string().required(),
        answer: yup.string().required(),
    }).required();

    const {register, handleSubmit, formState: {errors, isValid}} = useForm<StateForm>({
        mode: "onChange",
        resolver: yupResolver(schema),
    })

    const onSubmit: SubmitHandler<StateForm> = async (data) => {
        cardsTotalCount !== 0
        ? await dispatch(updateCard(cardsPack_id, card_id, data.question, data.answer))
        : await dispatch(addCard(cardsPack_id, data.question, data.answer));
        setEditMode(false);
    }

    const onClickCancel = () => setEditMode(false);
    return (
        <div className={s.editCard}>
            { status === "loading" && <Preloader/> }
            <h3 className={s.cardTitle}>Card Info</h3>
            <form onSubmit={handleSubmit(onSubmit)}
                  className={s.form}
            >
                <div className={s.inputBlock}>
                    <span className={s.title}>Question</span>
                    <input className={s.input}
                           {...register('question')}
                           type="text"
                           required
                           value={answer}
                           placeholder='Question'
                    />
                    <span className={s.attach}>+ Attach file</span>
                </div>
                <div className={s.inputBlock}>
                    <span className={s.title}>Answer</span>
                    <input className={s.input}
                           {...register('answer')}
                           type="text"
                           required
                           value={question}
                           placeholder='Answer'
                    />
                    <span className={s.attach}>+ Attach file</span>
                </div>
                <div className={s.buttonGrope}>
                    <button className={`${s.btn} ${s.cancel_btn}`}
                            onClick={onClickCancel}
                    >
                        Cancel
                    </button>
                    <button className={s.btn}
                            type={'submit'}
                            disabled={!isValid}
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    )
};

type StateForm = {
    question: string;
    answer: string;
};

type EditCardType = {
    cardId?: string;
    answer?: string;
    question?: string;
    setEditMode: (editMode: boolean) => void;
};