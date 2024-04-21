import { useEffect, useState } from 'react';
import searchIcon from '../../assets/searchIcon.svg';
import styles from './Input.module.css';
import { InputType } from './InputType';
import { JSONMap } from '../../models/json';

interface InputProps<T> {
    placeholderText?: string;
    withSearchIcon?: boolean;
    type: InputType;
    label?: string;
    value?: string;
    onSearchIconClick?: () => void;
    onChange?: (arg0: string) => void;
    options?: string[];
    getHints?: (arg: string) => Promise<Array<JSONMap>>;
    hintMapper?: (arg0: JSONMap) => T;
    getHintName?: (arg: T) => string;
    onHintClick?: (arg: T) => void;
}

const Input = <T,>({ ...props }: InputProps<T>) => {
    const [value, setValue] = useState<string>(props.value ?? '');
    const [hints, setHints] = useState<Array<T>>([]);
    const [showHints, setShowHints] = useState<boolean>(false);
    const [currentHintValue, setCurrentHintValue] = useState<T>();

    useEffect(() => {
        updateHints();
    }, [value]);

    const updateHints = () => {
        if (props.getHints !== undefined && props.hintMapper !== undefined) {
            props
                .getHints(value)
                .then((resp) =>
                    resp
                        .map((hint) => props.hintMapper!(hint))
                        .filter(
                            (hint) =>
                                JSON.stringify(hint) !=
                                JSON.stringify(currentHintValue),
                        ),
                )
                .then((hints) => setHints(hints));
        }

        if (hints.length != 0) {
            setShowHints(true);
        }
    };

    const onHintClick = (hint: T) => {
        if (props.onHintClick !== undefined) {
            props.onHintClick(hint);
        }
        setCurrentHintValue(hint);
        setValue(props.getHintName!(hint));
        setShowHints(false);
    };

    switch (props.type) {
        case InputType.text:
        case InputType.password:
            return (
                <div
                    className={styles.container}
                    // Fix onBlur hide hints
                    // onBlur={(e) => console.log(e)}
                >
                    {props.label !== undefined && (
                        <label className={styles.label}>{props.label}</label>
                    )}
                    <input
                        value={value}
                        onChange={(e) => {
                            setValue(e.target.value);
                            if (props.onChange !== undefined) {
                                props.onChange(e.target.value);
                            }
                        }}
                        placeholder={props.placeholderText}
                        type={
                            props.type == InputType.text ? 'text' : 'password'
                        }
                        className={styles.input}
                        onFocus={updateHints}
                    />
                    {props.withSearchIcon !== undefined && (
                        <img
                            src={searchIcon}
                            alt="Search icon"
                            onClick={props.onSearchIconClick}
                            className={styles.searchIcon}
                        />
                    )}
                    {showHints && props.getHintName !== undefined && (
                        <div className={styles.hints}>
                            {hints.map((hint, ind) => (
                                <div
                                    key={ind}
                                    className={styles.hintsItem}
                                    onClick={() => onHintClick(hint)}>
                                    {props.getHintName!(hint)}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            );
        case InputType.select:
            return (
                <div className={styles.container}>
                    {props.label !== undefined && (
                        <label className={styles.label}>{props.label}</label>
                    )}
                    <select
                        value={value}
                        onChange={(e) => {
                            setValue(e.target.value);
                            if (props.onChange !== undefined) {
                                props.onChange(e.target.value);
                            }
                        }}
                        className={styles.selectInput}>
                        <option
                            value=""
                            disabled
                            selected
                            hidden
                            className={styles.placeholder}>
                            {props.placeholderText}
                        </option>
                        {props.options?.map((it) => (
                            <option value={it}>{it}</option>
                        ))}
                    </select>
                </div>
            );
        case InputType.calendar:
            return (
                <div className={styles.container}>
                    {props.label !== undefined && (
                        <label className={styles.label}>{props.label}</label>
                    )}
                    <div className={styles.content}>
                        <input
                            value={value}
                            onChange={(e) => {
                                setValue(e.target.value);
                                if (props.onChange !== undefined) {
                                    props.onChange(e.target.value);
                                }
                            }}
                            placeholder={props.placeholderText}
                            type="date"
                            className={styles.input}
                        />
                        {props.withSearchIcon !== undefined && (
                            <img
                                src={searchIcon}
                                alt="Search icon"
                                onClick={props.onSearchIconClick}
                                className={styles.searchIcon}
                            />
                        )}
                    </div>
                </div>
            );
    }
};

export default Input;
