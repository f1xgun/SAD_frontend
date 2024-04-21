import styles from './ElementControllers.module.css';
import editIcon from '../../assets/editIcon.svg';
import deleteIcon from '../../assets/deleteIcon.svg';

interface ElementControllersProps {
    onEdit?: () => void;
    onDelete?: () => void;
    showDeleteIcon: boolean;
    showEditIcon: boolean;
}

const ElementControllers = ({ ...props }: ElementControllersProps) => {
    return (
        <div className={styles.controllersContainer}>
            {props.showEditIcon && (
                <button>
                    <img src={editIcon} onClick={props.onEdit} />
                </button>
            )}
            {props.showDeleteIcon && (
                <button>
                    <img src={deleteIcon} onClick={props.onDelete} />
                </button>
            )}
        </div>
    );
};

export default ElementControllers;
