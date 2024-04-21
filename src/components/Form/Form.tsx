import styles from './Form.module.css';

interface FormProps {
    name: string;
    inputs: Array<JSX.Element>;
    submitButton: JSX.Element;
    footer?: JSX.Element;
}

const Form = ({ ...props }: FormProps) => {
    return (
        <form className={styles.form}>
            <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>{props.name}</legend>
                <div className={styles.inputs}>{props.inputs}</div>
                {props.submitButton}
            </fieldset>
            {props.footer}
        </form>
    );
};

export default Form;
