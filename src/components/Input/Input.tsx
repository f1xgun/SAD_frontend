import { useEffect, useRef, useState } from 'react';
import styles from './Input.module.css';
import { InputType } from './InputType';
import { JSONMap } from '../../models/json';

interface InputProps<T> {
    placeholderText?: string;
    type: InputType;
    label?: string;
    value?: string;
    onChange?: (arg0: string) => void;
    options?: string[];
    getHints?: (arg: string) => Promise<Array<JSONMap>>;
    hintMapper?: (arg0: JSONMap) => T;
    getHintName?: (arg: T) => string;
    onHintClick?: (arg: T) => void;
    onBlur?: () => void;
}

const Input = <T,>({ ...props }: InputProps<T>) => {
    const [value, setValue] = useState<string>(props.value ?? '');
    const [hints, setHints] = useState<Array<T>>([]);
    const [showHints, setShowHints] = useState<boolean>(false);
    const [currentHintValue, setCurrentHintValue] = useState<T | null>(null);
    const inputRef = useRef<HTMLDivElement>(null);

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

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                inputRef.current &&
                !inputRef.current.contains(event.target as Node)
            ) {
                setShowHints(false);
                if (props.onBlur) {
                    props.onBlur();
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [inputRef, props]);

    switch (props.type) {
        case InputType.text:
        case InputType.password:
        case InputType.number:
            return (
                <div className={styles.container} ref={inputRef}>
                    {props.label !== undefined && (
                        <label className={styles.label}>{props.label}</label>
                    )}
                    <div className={styles.inputContainer}>
                        <input
                            value={value}
                            onChange={(e) => {
                                setCurrentHintValue(null);

                                setValue(e.target.value);

                                if (props.onChange !== undefined) {
                                    props.onChange(e.target.value);
                                }
                            }}
                            placeholder={props.placeholderText}
                            type={props.type.toString()}
                            className={styles.input}
                            onFocus={updateHints}
                        />
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
                </div>
            );
        case InputType.select:
            return (
                <div className={styles.container}>
                    {props.label !== undefined && (
                        <label className={styles.label}>{props.label}</label>
                    )}
                    <select
                        value={value || ''}
                        onChange={(e) => {
                            setValue(e.target.value);
                            if (props.onChange !== undefined) {
                                props.onChange(e.target.value);
                            }
                        }}
                        defaultValue={value || ''}
                        className={styles.selectInput}>
                        <option
                            value=""
                            disabled
                            hidden
                            className={styles.placeholder}>
                            {props.placeholderText}
                        </option>
                        {props.options?.map((it) => (
                            <option key={it} value={it}>
                                {it}
                            </option>
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
                    </div>
                </div>
            );
    }
};

export default Input;
