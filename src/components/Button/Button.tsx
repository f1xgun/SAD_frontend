import styles from './Button.module.css';
// import arrowSvg from '../../assets/arrow.svg';
import { Link } from 'react-router-dom';

interface ButtonProps {
    text: string;
    onClick?: () => void;
    withArrow?: boolean;
    link?: string;
}

const Button = ({ ...props }: ButtonProps) => {
    return (
        <>
            {props.link !== undefined ? (
                <Link to={props.link} className={styles.button}>
                    {props.text}
                </Link>
            ) : (
                <a className={styles.button} onClick={props.onClick}>
                    {props.text}
                    {/* {props.withArrow === true && <img src={arrowSvg} />} */}
                </a>
            )}
        </>
    );
};

export default Button;
