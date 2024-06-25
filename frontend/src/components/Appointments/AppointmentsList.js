import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Appointments/AppointmentsList.css';

const AppointmentsList = ({ currentUser }) => {
    const [appointments, setAppointment] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/my_appointments=${currentUser.id}`)
            .then(response => {
                setAppointment(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching appointments!', error);
            });
    }, []);

    return (
        <div className="appointments-list">
            <h1>Список заявок</h1>
            <ul>
                <li >
                    <ul>
                        <li className="spli">28.06.2024</li>
                        <li className="spli">0:30</li>
                        <li className="spli">10:32</li>
                        <li className="spli">22.06.2024</li>
                        <li className="spli">ожидает утверждения</li>
                    </ul>
                </li>
                {appointments.map(appointment => (
                    
                    <li key={appointment.appointment_id}>{appointment.appointment_date} {appointment.appointment_duration} {appointment.entry_datetime} {appointment.status}</li>
                ))}
            </ul>
        </div>
    );
};

export default AppointmentsList;