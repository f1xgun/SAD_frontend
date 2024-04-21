import styles from './ScrollContainer.module.css';

interface ScrollContainerProps {
    headerTitle: string;
    children: Array<JSX.Element>;
    footer?: JSX.Element;
}

const ScrollContainer = ({ ...props }: ScrollContainerProps) => {
    return (
        <div className={styles.container}>
            <p className={styles.headerTitle}>{props.headerTitle}</p>
            <div className={styles.scrollContainer}>
                {props.children.map((child, idx) => {
                    return (
                        <div key={idx} className={styles.element}>
                            {child}
                        </div>
                    );
                })}
            </div>
            {props.footer !== undefined && props.footer}
        </div>
    );
};

export default ScrollContainer;
