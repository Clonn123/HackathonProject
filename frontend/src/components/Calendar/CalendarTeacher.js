import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { addMonths, subMonths, format, startOfDay, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay } from 'date-fns';
import './CalendarTeacher.css';
import ModalDayTeacher from './ModalDayTeacher';
import axios from 'axios';


const CalendarTeacher = () => {
    const { id_teacher } = useParams(); // Получаем id_teacher из URL
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [eventsModalOpen, setEventsModalOpen] = useState(false);
    const [events, setEvents] = useState([]); 

    const loadEvents = async (date) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/eventsList/${id_teacher}/?search=${date}`);
    
            if (response.status !== 200) {
                throw new Error('Ошибка загрузки событий');
            }
    
            const data = response.data;
            setEvents(data);
        } catch (error) {
            console.error('Ошибка загрузки данных:', error);
        }
    };

    const renderHeader = () => {
        const dateFormat = "MMMM yyyy";

        return (
            <div className="my-calendar-header my-calendar-row my-calendar-flex-middle">
                <div className="my-calendar-col my-calendar-col-start">
                    <div className="my-calendar-icon" onClick={prevMonth}>Previous</div>
                </div>
                <div className="my-calendar-col my-calendar-col-center">
                    <span>{format(currentMonth, dateFormat)}</span>
                </div>
                <div className="my-calendar-col my-calendar-col-end" onClick={nextMonth}>
                    <div className="my-calendar-icon">Next</div>
                </div>
            </div>
        );
    };

    const renderDays = () => {
        const dateFormat = "eeee";
        const days = [];

        let startDate = startOfWeek(currentMonth, { weekStartsOn: 1 }); // Week starts on Monday

        for (let i = 0; i < 7; i++) {
            days.push(
                <div className="my-calendar-col my-calendar-col-center" key={i}>
                    {format(addDays(startDate, i), dateFormat)}
                </div>
            );
        }

        return <div className="my-calendar-days my-calendar-row my-calendar-center ">{days}</div>;
    };

    const renderCells = () => {
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart, { weekStartsOn: 1 }); // Week starts on Monday
        const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 }); // Week starts on Monday

        const dateFormat = "d";
        const rows = [];

        let days = [];
        let day = startDate;
        let formattedDate = "";

        
        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                const cloneDay = day;
                formattedDate = format(day, dateFormat);
                days.push(
                    <div
                        className={`my-calendar-col my-calendar-cell ${!isSameMonth(day, monthStart)
                            ? "my-calendar-disabled"
                            : isSameDay(day, selectedDate) ? "my-calendar-selected"  : ""}`}
                        key={day}
                        onClick={() => onDateClick(cloneDay)}
                    >
                        {/* <span className="my-calendar-number">{formattedDate}</span> */}
                        <span className="my-calendar-number my-calendar-center">{formattedDate}</span>
                    </div>
                );
                day = addDays(day, 1);
            }
            rows.push(
                <div className="my-calendar-row" key={day}>
                    {days}
                </div>
            );
            days = [];
        }
        return <div className="my-calendar-body">{rows}</div>;
    };

    const onDateClick = day => {
        setEventsModalOpen(true);
        setSelectedDate(day);
        // console.log(day)
        const formattedDate = format(startOfDay(day), 'yyyy-MM-dd');
        // console.log(formattedDate);
        loadEvents(formattedDate);
    };

    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };

    const prevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };

    return (
        <div className="my-calendar-calendar">
            {renderHeader()}
            {renderDays()}
            {renderCells()}

            <ModalDayTeacher 
            isOpen={eventsModalOpen} 
            onClose={() => setEventsModalOpen(false)} 
            events={events} 
            id_teacher={id_teacher} 
            selectedDate={selectedDate} />
        </div>
    );
};

export default CalendarTeacher;
