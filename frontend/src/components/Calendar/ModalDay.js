import React, { useState, useEffect } from 'react';
import './ModalDay.css';
import { addMonths, subMonths, format, startOfDay, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay } from 'date-fns';
import ModalEvent from './ModalEvent';

const Modal = ({ isOpen, onClose, events, id_teacher, selectedDate }) => {
    const [isCreateSlotModalOpen, setIsCreateSlotModalOpen] = useState(false);

    if (!isOpen) return null;

    const openCreateSlotModal = () => {
        setIsCreateSlotModalOpen(true);
    };

    const closeCreateSlotModal = () => {
        setIsCreateSlotModalOpen(false);
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h2>Слоты на выбранную дату</h2>
                    <button onClick={openCreateSlotModal}>Добавить слот</button>
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
            <ModalEvent 
                isOpen={isCreateSlotModalOpen} 
                onClose={closeCreateSlotModal} 
                selectedDate={selectedDate} 
                id_teacher={id_teacher}
            />
        </div>
    );
};

export default Modal;
