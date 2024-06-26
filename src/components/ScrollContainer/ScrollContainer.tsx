import styles from './ScrollContainer.module.css';

interface ScrollContainerProps {
    headerTitle: string;
    children: Array<JSX.Element>;
    emptyChildrenText: string;
    footer?: JSX.Element;
}

const ScrollContainer: React.FC<ScrollContainerProps> = ({
    headerTitle,
    children,
    footer,
    emptyChildrenText,
}) => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                {headerTitle}
            </div>
            <div className={styles.scrollContainer}>
                {children.length === 0 ? (
                    <p>{emptyChildrenText}</p>
                ) : (
                    children.map((child, idx) => {
                        return (
                            <div key={idx} className={styles.element}>
                                {child}
                            </div>
                        );
                    })
                )}
            </div>
            {footer !== undefined && footer}
        </div>
    );
};

export default ScrollContainer;
