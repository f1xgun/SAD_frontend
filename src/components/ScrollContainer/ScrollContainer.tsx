import addIcon from './../../assets/newIcon.svg';
import styles from './ScrollContainer.module.css';
import editIcon from './../../assets/editIcon.svg';

interface ScrollContainerProps {
    headerTitle: string;
    children: Array<JSX.Element>;
    emptyChildrenText: string;
    footer?: JSX.Element;
    showAddButton?: boolean;
    onAddButtonClick?: () => void;
    showEditButton?: boolean;
    onEditButtonClick?: () => void;
}

const ScrollContainer: React.FC<ScrollContainerProps> = ({
    headerTitle,
    children,
    footer,
    showAddButton,
    onAddButtonClick,
    emptyChildrenText,
    showEditButton,
    onEditButtonClick,
}) => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                {headerTitle}
                {(showAddButton || showEditButton) && (
                    <div className={styles.actionButtonsCotainer}>
                        {showAddButton && (
                            <button>
                                <img src={addIcon} onClick={onAddButtonClick} />
                            </button>
                        )}
                        {showEditButton && (
                            <button>
                                <img
                                    src={editIcon}
                                    onClick={onEditButtonClick}
                                />
                            </button>
                        )}
                    </div>
                )}
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
