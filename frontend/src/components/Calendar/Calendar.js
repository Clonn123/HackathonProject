import React, { useState } from 'react';
import { addMonths, subMonths, format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay } from 'date-fns';
import './Calendar.css';

const Calendar = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    const renderHeader = () => {
        const dateFormat = "MMMM yyyy";

        return (
            <div className="my-calendar-header my-calendar-row my-calendar-flex-middle">
                <div className="my-calendar-col my-calendar-col-start">
                    <div className="my-calendar-icon" onClick={prevMonth}> Previous</div>
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

        let startDate = startOfWeek(currentMonth);

        for (let i = 0; i < 7; i++) {
            days.push(
                <div className="my-calendar-col my-calendar-col-center" key={i}>
                    {format(addDays(startDate, i), dateFormat)}
                </div>
            );
        }

        return <div className="my-calendar-days my-calendar-row">{days}</div>;
    };

    const renderCells = () => {
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);

        const dateFormat = "d";
        const rows = [];

        let days = [];
        let day = startDate;
        let formattedDate = "";

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = format(day, dateFormat);
                const cloneDay = day;
                days.push(
                    <div
                        className={`my-calendar-col my-calendar-cell ${!isSameMonth(day, monthStart)
                            ? "my-calendar-disabled"
                            : isSameDay(day, selectedDate) ? "my-calendar-selected" : ""}`}
                        key={day}
                        onClick={() => onDateClick(cloneDay)}
                    >
                        <span className="my-calendar-number">{formattedDate}</span>
                        <span className="my-calendar-bg">{formattedDate}</span>
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
        setSelectedDate(day);
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
        </div>
    );
};

export default Calendar;
