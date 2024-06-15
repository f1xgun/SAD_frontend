import GradesApi from '../../../api/GradesApi';
import Button from '../../../components/Button/Button';
import styles from './GradesExportRecord.module.css';

const GradesExportRecord = () => {
    const getReport = () => {
        GradesApi.getGradesReport().then((response) => {
            const url = window.URL.createObjectURL(response.data);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'grades_report.csv';

            document.body.appendChild(link);

            link.click();

            link.parentNode?.removeChild(link);
        });
    };

    return (
        <div className={styles.container}>
            <p className={styles.text}>
                Нажмите кнопку для экспорта всех оценок
            </p>
            <Button text="Экспортировать" onClick={getReport} />
        </div>
    );
};

export default GradesExportRecord;
