import React, { useState, useEffect } from 'react';
import './ModalDay.css';
import { addMonths, subMonths, format, startOfDay, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay } from 'date-fns';
import ModalEvent from './ModalEvent';
import krest from './krest.png';
import gal from './gal.png';

const ModalDay = ({ isOpen, onClose, events, id_teacher, selectedDate }) => {
    const [isCreateSlotModalOpen, setIsCreateSlotModalOpen] = useState(false);

    if (!isOpen) return null;

    const openCreateSlotModal = () => {
        setIsCreateSlotModalOpen(true);
    };

    const closeCreateSlotModal = () => {
        setIsCreateSlotModalOpen(false);
        onClose(); // Закрыть текущее модальное окно
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
                                <div key={event.event_id} className="event-item">
                                    <p><strong>Дата:</strong> {event.event_date}</p>
                                    <p><strong>Продолжительность:</strong> {event.duration} минут</p>
                                    {/* Другие поля по необходимости */}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                            
            <div className="modal-container-right">                
                    <div className="modal-header">
                        <h2>Заявки на слоты</h2>                        
                        <button className="modal-close-btn" onClick={onClose}>Закрыть</button>
                    </div>
                    <div className="modal-body">
                        <div className="modal-content">
                            {events.map(event => (
                                <div key={event.event_id} className="event-item">
                                    <p><strong>Дата:</strong> {event.event_date}</p>
                                    <p><strong>Продолжительность:</strong> {event.duration} минут</p>
                                    <p><strong>Студент:</strong> Иванов Иван </p>
                                    <p><strong>Тема:</strong> Консультация </p>
                                    <div className="event-buttons">
                                        <button className="event-button">
                                            <img src={gal} alt="Approve" />
                                        </button>
                                        <button className="event-button">
                                            <img src={krest} alt="Reject" />
                                        </button>
                                    </div>
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

export default ModalDay;
