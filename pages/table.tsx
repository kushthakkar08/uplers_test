import styles from '../styles/Table.module.css'
const TablePage = () => {
    return (
        <div className={styles.container}>
            {[...Array(12)].map((_, index) => (
                <div key={index} className={styles.item}>
                    <span className={styles.tooltip}>Tooltip Text</span>
                    Cell {index + 1}
                </div>
            ))}
        </div>
    );
};

export default TablePage;