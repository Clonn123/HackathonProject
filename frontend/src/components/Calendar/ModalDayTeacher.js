import React, { useState, useEffect } from 'react';
import './ModalDay.css';
import { addMonths, subMonths, format, startOfDay, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay } from 'date-fns';
import ModalEvent from './ModalEventTeacher';



const ModalDayTeacher = ({ isOpen, onClose, events, id_teacher, selectedDate }) => {
    const [isCreateSlotModalOpen, setIsCreateSlotModalOpen] = useState(false);

    if (!isOpen) return null;

    // Приведение к массиву, если это объект
    const eventsArray = Array.isArray(events) ? events : [events];
    console.log('ModalDayTeacher events:', eventsArray); // Логируем данные
    console.log('id_teacher:', id_teacher);

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
                    <button className="modal-close-btn" onClick={onClose}>Закрыть</button>
                </div>
                <div className="modal-body">
                    <div className="modal-content">
                        {eventsArray
                            .filter(event => event.teacher_id == id_teacher) // Фильтруем события по id_teacher
                            .map(event => (
                                <div key={event.event_id} className="event-item">
                                    <p><strong>Дата:</strong> {event.event_date}</p>
                                    <p><strong>Продолжительность:</strong> {event.duration} минут</p>
                                    <p><button onClick={() => openCreateSlotModal()}>Записаться</button></p>
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

export default ModalDayTeacher;
