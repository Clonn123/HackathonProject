import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, events }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h2>События на выбранную дату</h2>
                    <button className="modal-close-btn" onClick={onClose}>Закрыть</button>
                </div>
                <div className="modal-body">
                    <div className="modal-content">
                        {events.map(event => (
                            <div key={event.appointment_id} className="event-item">
                                <p><strong>Дата:</strong> {event.appointment_date}</p>
                                <p><strong>Продолжительность:</strong> {event.appointment_duration} минут</p>
                                <p><strong>Тема:</strong> {event.theme_id}</p>
                                <p><strong>Статус:</strong> {event.status}</p>
                                {/* Другие поля по необходимости */}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
