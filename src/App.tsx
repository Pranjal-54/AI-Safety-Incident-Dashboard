import { useState, useEffect } from 'react';
import { mockIncidents } from './data/mockIncidents';
import { Incident } from './types/types';
import IncidentList from './components/IncidentList';
import ControlsBar from './components/ControlsBar';
import AddIncidentForm from './components/AddIncidentForm';
import styles from './App.module.css';

export default function App() {
  // Initialize state with deduplicated mock data
  const [incidents, setIncidents] = useState<Incident[]>(() => {
    const uniqueIds = new Set<number>();
    return mockIncidents.filter(incident => {
      if (uniqueIds.has(incident.id)) return false;
      uniqueIds.add(incident.id);
      return true;
    });
  });

  const [filter, setFilter] = useState<'All' | 'Low' | 'Medium' | 'High'>('All');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');
  const [isLoading, setIsLoading] = useState(false);

  // Handle adding new incidents
  const handleAddIncident = (newIncident: Omit<Incident, 'id' | 'reported_at'>) => {
    setIsLoading(true);

    // Simulate API delay
    setTimeout(() => {
      setIncidents(prev => [
        ...prev,
        {
          ...newIncident,
          id: Math.max(0, ...prev.map(i => i.id)) + 1,
          reported_at: new Date().toISOString()
        }
      ]);
      setIsLoading(false);
    }, 500);
  };

  // Filter and sort incidents
  const filteredIncidents = incidents.filter(incident =>
    filter === 'All' || incident.severity === filter
  );

  const sortedIncidents = [...filteredIncidents].sort((a, b) => {
    const dateA = new Date(a.reported_at).getTime();
    const dateB = new Date(b.reported_at).getTime();
    return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
  });

  // Cleanup duplicates on mount (safety check)
  useEffect(() => {
    setIncidents(prev => {
      const unique = new Map<number, Incident>();
      prev.forEach(incident => {
        if (!unique.has(incident.id)) {
          unique.set(incident.id, incident);
        }
      });
      return Array.from(unique.values());
    });
  }, []);

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>AI Safety Incident Dashboard</h1>
        <p className={styles.subtitle}>Tracking and reporting AI safety concerns</p>
      </header>

      <div className={styles.controlsContainer}>
        <ControlsBar
          onFilterChange={setFilter}
          onSortChange={setSortBy}
          currentFilter={filter}
          currentSort={sortBy}
        />

        <AddIncidentForm
          onAddIncident={handleAddIncident}
          isSubmitting={isLoading}
        />
      </div>

      {isLoading ? (
        <div className={styles.loadingOverlay}>
          <div className={styles.loadingSpinner}></div>
          <p>Updating incidents...</p>
        </div>
      ) : (
        <IncidentList incidents={sortedIncidents} />
      )}
      <footer className={styles.footer}>
        © {new Date().getFullYear()} Pranjal Thakur. All rights reserved.
      </footer>
    </div>
  );
}