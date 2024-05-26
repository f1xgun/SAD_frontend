import React, { useState } from 'react';
import styles from './GradesTable.module.css';
import { Column, useTable } from 'react-table';
import { IUserSubjectGrades, finalGrades } from '../../../models/grades/Grades';
import { JSONMap } from '../../../models/json';
import Input from '../../../components/Input/Input';
import { InputType } from '../../../components/Input/InputType';

const ReadOnlyCell = ({ value }: { value: string | number }) => {
    return <div>{value}</div>;
};

const FinalGradeCell = ({ value }: { value: string | null }) => {
    const [evaluation, setEvaluation] = useState<string | null>(value);

    return (
        <Input
            type={InputType.select}
            placeholderText="Итоговая оценка"
            key="final-grade"
            onChange={(value) => setEvaluation(value)}
            value={evaluation?.toString()}
            options={Object.values(finalGrades)}
        />
    );
};

interface EditableCellProps<T extends object> {
    value: string | number;
    row: {
        index: number;
    };
    column: {
        id: keyof T;
    };
    updateData?: (
        rowIndex: number,
        columnId: keyof T,
        value: string | number,
    ) => void;
}

const EditableCell = <T extends object>({
    value: initialValue,
    row: { index },
    column: { id },
    updateData,
}: EditableCellProps<T>) => {
    const [value, setValue] = React.useState(initialValue);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const onBlur = () => {
        if (updateData) {
            updateData(index, id, value);
        }
    };

    React.useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    return (
        <Input
            type={InputType.number}
            value={value?.toString()}
            onChange={(newVal) => setValue(newVal)}
            onBlur={onBlur}
        />
    );
};

const defaultColumn = {
    Cell: EditableCell,
};

interface TableProps<T extends object> {
    columns: Column<T>[];
    data: T[];
    updateData: (
        rowIndex: number,
        columnId: keyof T,
        value: string | number,
    ) => void;
}

function Table<T extends object>({ columns, data, updateData }: TableProps<T>) {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({
            columns,
            data,
            defaultColumn,
            updateData,
        });

    return (
        <table {...getTableProps()} className={styles.table}>
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th
                                {...column.getHeaderProps()}
                                className={styles.headerCell}>
                                {column.render('Header')}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell, i) => {
                                if (i == 0) {
                                    return (
                                        <td {...cell.getCellProps()}>
                                            <ReadOnlyCell value={cell.value} />
                                        </td>
                                    );
                                }
                                if (i == row.cells.length - 1) {
                                    return (
                                        <td {...cell.getCellProps()}>
                                            <FinalGradeCell value={null} />
                                        </td>
                                    );
                                }
                                return (
                                    <td {...cell.getCellProps()}>
                                        {cell.render('Cell')}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

interface GradesTableProps {
    studentsWithGrades: Array<IUserSubjectGrades>;
}

function GradesTable({ studentsWithGrades }: GradesTableProps) {
    const uniqueDates = [
        ...new Set(
            ...studentsWithGrades.map((student) =>
                student.grades.map((grade) =>
                    grade.createdDate.toLocaleDateString(),
                ),
            ),
        ),
    ].sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

    const rows = studentsWithGrades.map((student) => {
        const studentData: JSONMap = {
            studentName: student.student.name,
        };

        uniqueDates.forEach((dateString) => {
            const grade = student.grades.find(
                (grade) =>
                    grade.createdDate.toLocaleDateString() === dateString,
            );
            studentData[dateString] = grade ? grade.evaluation : '';
        });

        return studentData;
    });

    console.log(uniqueDates, rows);

    const columns = React.useMemo<Column<JSONMap>[]>(
        () => [
            {
                Header: 'Студент',
                accessor: 'studentName',
            },
            {
                Header: 'Даты',
                columns: uniqueDates.map((date) => {
                    console.log(date, rows[0][date]);

                    return { Header: date, accessor: date };
                }),
            },
            {
                Header: 'Итоговая оценка',
                accessor: 'final',
            },
        ],
        [],
    );

    const [data, setData] =
        React.useState<Array<IUserSubjectGrades>>(studentsWithGrades);

    const updateData = (
        rowIndex: number,
        columnId: keyof JSONMap,
        value: string | number,
    ) => {
        console.log(rowIndex, columnId, value);

        setData((old) =>
            old.map((row, index) => {
                if (index === rowIndex) {
                    return {
                        ...old[rowIndex],
                        [columnId]: value,
                    };
                }
                return row;
            }),
        );
    };

    return data.length === 0 ? (
        'В данной группе нет студентов'
    ) : (
        <Table<JSONMap> columns={columns} data={rows} updateData={updateData} />
    );
}

export default GradesTable;
