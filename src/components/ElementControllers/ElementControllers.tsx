import styles from './ElementControllers.module.css';
import editIcon from '../../assets/editIcon.svg';
import deleteIcon from '../../assets/deleteIcon.svg';

interface ElementControllersProps {
    onEdit?: () => void;
    onDelete?: () => void;
    showDeleteIcon?: boolean;
    showEditIcon?: boolean;
}

const ElementControllers: React.FC<ElementControllersProps> = ({
    onEdit,
    onDelete,
    showDeleteIcon = false,
    showEditIcon = false,
}) => {
    return (
        <div className={styles.controllersContainer}>
            {showEditIcon && (
                <button>
                    <img src={editIcon} onClick={onEdit} />
                </button>
            )}
            {showDeleteIcon && (
                <button>
                    <img src={deleteIcon} onClick={onDelete} />
                </button>
            )}
        </div>
    );
};

export default ElementControllers;
