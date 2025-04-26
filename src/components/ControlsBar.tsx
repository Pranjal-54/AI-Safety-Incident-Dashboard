import { ChangeEvent } from 'react';
import styles from './ControlsBar.module.css';

type SeverityFilter = 'All' | 'Low' | 'Medium' | 'High';
type DateSort = 'newest' | 'oldest';

interface ControlsBarProps {
    onFilterChange: (severity: SeverityFilter) => void;
    onSortChange: (sortBy: DateSort) => void;
    currentFilter: SeverityFilter;
    currentSort: DateSort;
}

export default function ControlsBar({
    onFilterChange,
    onSortChange,
    currentFilter,
    currentSort
}: ControlsBarProps) {
    const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
        onFilterChange(e.target.value as SeverityFilter);
    };

    const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
        onSortChange(e.target.value as DateSort);
    };

    return (
        <div className={styles.controls}>
            <div className={styles.controlGroup}>
                <label htmlFor="severityFilter">Filter by Severity:</label>
                <select
                    id="severityFilter"
                    onChange={handleFilterChange}
                    value={currentFilter}
                    className={styles.select}
                >
                    <option value="All">All</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </div>

            <div className={styles.controlGroup}>
                <label htmlFor="dateSort">Sort by Date:</label>
                <select
                    id="dateSort"
                    onChange={handleSortChange}
                    value={currentSort}
                    className={styles.select}
                >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                </select>
            </div>
        </div>
    );
}