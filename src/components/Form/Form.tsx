import styles from './Form.module.css';

interface FormProps {
    name: string;
    inputs: Array<JSX.Element>;
    submitButton: JSX.Element;
    footer?: JSX.Element;
    inputs2?: Array<JSX.Element>;
}

const Form: React.FC<FormProps> = ({
    name,
    inputs,
    submitButton,
    footer,
    inputs2,
}) => {
    return (
        <form className={styles.form}>
            <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>{name}</legend>

                {inputs2 && inputs2.length !== 0 ? (
                    <div className={styles.inputsContainer}>
                        <div className={styles.inputs}>{inputs}</div>

                        <div className={styles.inputs}>{inputs2}</div>
                    </div>
                ) : (
                    <div className={styles.inputs}>{inputs}</div>
                )}
                {submitButton}
            </fieldset>
            {footer}
        </form>
    );
};

export default Form;
