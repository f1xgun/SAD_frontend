import styles from './ScrollSection.module.css';

interface ScrollSectionProps {
    title: string;
    children: Array<JSX.Element>;
    emptyChildrenText: string;
    footer?: JSX.Element;
}

const ScrollSection: React.FC<ScrollSectionProps> = ({
    title,
    children,
    footer,
    emptyChildrenText,
}) => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>{title}</div>
            <div className={styles.scrollSection}>
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

export default ScrollSection;
