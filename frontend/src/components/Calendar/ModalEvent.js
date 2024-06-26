import React, { useState } from 'react';
import { format, startOfDay, setHours, setMinutes, setSeconds } from 'date-fns';
import axios from 'axios';
import './ModalEvent.css';

const ModalEvent = ({ isOpen, onClose, selectedDate, id_teacher }) => {
    const [duration, setDuration] = useState('');
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formattedDate = format(startOfDay(new Date(selectedDate)), 'yyyy-MM-dd'); // Убедитесь, что selectedDate объект Date

        // Преобразование продолжительности из формата "1:20" в минуты
        const [hours, minutes] = duration.split(':').map(Number);
        const durationInSeconds = (hours * 60) + (minutes); // Преобразуем в минуты

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/events/', {
                teacher_id: id_teacher,
                event_date: formattedDate,
                duration: durationInSeconds
            });

            if (response.status === 201) {
                onClose(); // Закрыть окно со списком после успешного создания
            }
        } catch (error) {
            setError('Ошибка при создании слота');
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h2>Создать слот на консультацию</h2>
                    <button className="modal-close-btn" onClick={onClose}>Закрыть</button>
                </div>
                <div className="modal-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Продолжительность:</label>
                            <input
                                type="text"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                placeholder="1:20 (час:минуты)"
                            />
                        </div>
                        {error && <p className="error-message">{error}</p>}
                        <button type="submit">Создать слот</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ModalEvent;
