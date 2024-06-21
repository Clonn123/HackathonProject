import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../UserList/UserList.css";
import '../UserList/TeachersList.css';

const TeachersList = () => {
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/list/teachers')
            .then(response => {
                setTeachers(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the teachers!', error);
            });
    }, []);

    return (
        <div className="teachers-list">
            <h1>Список преподавателей</h1>
            <ul>
                {teachers.map(teacher => (
                    <li key={teacher.id}>{teacher.name} {teacher.surname} (контактная почта: {teacher.email})</li>
                ))}
            </ul>
        </div>
    );
};

export default TeachersList;