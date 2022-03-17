import s from "./SelectCountItemsOnPage.module.css";
import React, {ChangeEvent, DetailedHTMLProps, SelectHTMLAttributes} from 'react';

export const SelectCountItemsOnPage: React.FC<SelectCountItemsOnPageType> = (props) => {
    const {
        onChange,
        selectLength,
        setCountItemsOnPageCallback,
        ...restProps
    } = props;

    const options: number[] = [];
    for (let i = 1; i <= selectLength; i++) {
        options.push(i);
    }

    const mappedOptions: JSX.Element[] | undefined = options.map((o,i) => {
        return <option key={i}>{o}</option>;
    });

    const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange && onChange(e);
        setCountItemsOnPageCallback && setCountItemsOnPageCallback(Number(e.currentTarget.value));
    }

    return (
        <div className={s.selectCountItemsOnPage}>
            <span className={s.selectLabel}>Show</span>
            <select
                name="select"
                className={s.select}
                onChange={onChangeCallback}
                {...restProps}
            >
                {mappedOptions}
            </select>
            <span className={s.selectLabel}>Cards per Page</span>
        </div>
    );
};

type DefaultSelectPropsType = DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>;

type SelectCountItemsOnPageType = DefaultSelectPropsType & {
    selectLength: number;
    setCountItemsOnPageCallback?: (option: number) => void;
};