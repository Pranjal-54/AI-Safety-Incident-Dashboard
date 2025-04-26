import { useState } from 'react';
import { Incident } from '../types/types';
import styles from './AddIncidentForm.module.css';

interface AddIncidentFormProps {
    onAddIncident: (newIncident: Omit<Incident, 'id' | 'reported_at'>) => void;
    isSubmitting?: boolean;
}

export default function AddIncidentForm({ onAddIncident }: AddIncidentFormProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        severity: 'Medium' as const,
    });
    const [errors, setErrors] = useState({
        title: '',
        description: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = () => {
        let valid = true;
        const newErrors = { title: '', description: '' };

        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
            valid = false;
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        const newIncident = {
            ...formData,
            reported_at: new Date().toISOString(),
        };

        setTimeout(() => {
            onAddIncident(newIncident);
            setFormData({
                title: '',
                description: '',
                severity: 'Medium',
            });
            setIsSubmitting(false);
            setIsVisible(false);
        }, 800); // Simulate API delay
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className={styles.formContainer}>
            <button
                onClick={() => setIsVisible(!isVisible)}
                className={styles.toggleButton}
            >
                {isVisible ? 'Cancel' : '+ Report New Incident'}
            </button>

            {isVisible && (
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="title">Title*</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className={errors.title ? styles.errorInput : ''}
                        />
                        {errors.title && <span className={styles.error}>{errors.title}</span>}
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="description">Description*</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={4}
                            className={errors.description ? styles.errorInput : ''}
                        />
                        {errors.description && <span className={styles.error}>{errors.description}</span>}
                    </div>

                    <div className={styles.formGroup}>
                        <label>Severity</label>
                        <div className={styles.radioGroup}>
                            {(['Low', 'Medium', 'High'] as const).map(level => (
                                <label key={level} className={styles.radioLabel}>
                                    <input
                                        type="radio"
                                        name="severity"
                                        value={level}
                                        checked={formData.severity === level}
                                        onChange={handleChange}
                                    />
                                    {level}
                                </label>
                            ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className={styles.submitButton}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Report'}
                    </button>
                </form>
            )}
        </div>
    );
}