import { useState } from 'react';
import searchIcon from '../../assets/searchIcon.svg';
import styles from './Input.module.css';
import { InputType } from './InputType';

interface InputProps {
    placeholderText?: string;
    withSearchIcon?: boolean;
    type: InputType;
    label?: string;
    value?: string;
    onClick?: () => void;
    onChange?: (arg0: string) => void;
    options?: string[];
    onFocus?: () => void;
    onBlur?: () => void;
}

const Input = ({ ...props }: InputProps) => {
    const [value, setValue] = useState(props.value ?? '');

    switch (props.type) {
        case InputType.text:
        case InputType.password:
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
                            type={
                                props.type == InputType.text
                                    ? 'text'
                                    : 'password'
                            }
                            className={styles.input}
                            onFocus={props.onFocus}
                            onBlur={props.onBlur}
                        />
                        {props.withSearchIcon !== undefined && (
                            <img
                                src={searchIcon}
                                alt="Search icon"
                                onClick={props.onClick}
                                className={styles.searchIcon}
                            />
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
                    <div className={styles.selectContent}>
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
                                onClick={props.onClick}
                                className={styles.searchIcon}
                            />
                        )}
                    </div>
                </div>
            );
    }
};

export default Input;
