import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent} from 'react';
import s from "./SearchInput.module.css";
export const SearchInput: React.FC<SearchInputType> = (
    {
        type,
        onChange, onChangeText,
        onKeyPress, onEnter,
        className,
        ...restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {


        onChange
        && onChange(e);

        onChangeText && onChangeText(e.currentTarget.value);
    }
    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(e);

        onEnter
        && e.key === 'Enter'
        && onEnter();
    }

    const finalInputClassName = `${restProps.value !== '' ? s.searchInput : s.errorInput} ${className}`;
    return (
        <div>
            <input
                type={'text'}
                onChange={onChangeCallback}
                onKeyPress={onKeyPressCallback}
                className={finalInputClassName}

                {...restProps}
            />
            {/*<SearchInputComponent className={finalInputClassName} callBack={onChangeCallback}/>*/}
        </div>
    );
};

type DefaultInputType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
type SearchInputType = DefaultInputType & {
    onChangeText?: (value: string) => void
    onEnter?: () => void
}