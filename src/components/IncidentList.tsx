import { Incident } from '../types/types';
import IncidentCard from './IncidentCard';
import styles from './IncidentList.module.css';

interface IncidentListProps {
    incidents: Incident[];
    isLoading?: boolean; // Add this line to define the prop
}

export default function IncidentList({ incidents, isLoading = false }: IncidentListProps) {
    if (isLoading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.spinner}></div>
                <p>Loading incidents...</p>
            </div>
        );
    }

    if (incidents.length === 0) {
        return <div className={styles.empty}>No incidents found</div>;
    }

    return (
        <div className={styles.incidentList}>
            {incidents.map((incident) => (
                <IncidentCard key={incident.id} incident={incident} />
            ))}
        </div>
    );
}