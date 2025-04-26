import { useState } from 'react';
import { Incident } from '../types/types';
import styles from './IncidentCard.module.css';

export default function IncidentCard({ incident }: { incident: Incident }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const severityColor = {
        Low: 'green',
        Medium: 'orange',
        High: 'red'
    };

    return (
        <div
            className={styles.card}
            style={{ borderLeft: `4px solid ${severityColor[incident.severity]}` }}
        >
            <div className={styles.header}>
                <h3>{incident.title}</h3>
                <span className={styles.severity}>{incident.severity}</span>
                <span className={styles.date}>
                    {new Date(incident.reported_at).toLocaleDateString()}
                </span>
            </div>
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className={styles.toggleButton}
            >
                {isExpanded ? 'Hide Details' : 'View Details'}
            </button>
            {isExpanded && <p className={styles.description}>{incident.description}</p>}
        </div>
    );
}