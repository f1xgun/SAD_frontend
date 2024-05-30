import styles from './LogoutIcon.module.css';

interface LogoutIconProps {
    onClick: () => void;
}

const LogoutIcon: React.FC<LogoutIconProps> = ({ onClick }) => {
    return (
        <svg
            onClick={onClick}
            className={styles.icon}
            width="42"
            height="46"
            viewBox="0 0 42 46"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M14.75 7.375H12.6667C7.75621 7.375 5.30098 7.375 3.77548 8.90048C2.25 10.426 2.25 12.8812 2.25 17.7917V18.8333M14.75 38.625H12.6667C7.75621 38.625 5.30098 38.625 3.77548 37.0996C2.25 35.574 2.25 33.1187 2.25 28.2083V27.1667"
                stroke="white"
                stroke-width="4"
                stroke-linecap="round"
            />
            <path
                d="M24.4533 2.89065C19.949 2.10502 17.6969 1.71221 16.2234 3.01844C14.75 4.32467 14.75 6.71404 14.75 11.4928V34.5078C14.75 39.2866 14.75 41.6759 16.2234 42.9822C17.6969 44.2884 19.949 43.8955 24.4533 43.1099L29.305 42.2639C34.2935 41.3936 36.7877 40.9586 38.269 39.1289C39.75 37.2993 39.75 34.653 39.75 29.3605V16.6401C39.75 11.3476 39.75 8.7014 38.269 6.87169C37.2792 5.64892 35.8369 5.04902 33.5 4.5259"
                stroke="white"
                stroke-width="4"
                stroke-linecap="round"
            />
            <path
                d="M21 20.917V25.0837"
                stroke="white"
                stroke-width="4"
                stroke-linecap="round"
            />
        </svg>
    );
};

export default LogoutIcon;
