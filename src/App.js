import React, { useEffect, useState } from 'react';
import UserForm from './pages/UserFormPages/UserFormPages';
import  './App.css';
const App = () => {
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const fetchUsers = async () => {
        const response = await fetch('http://localhost:8000/users');
        const data = await response.json();
        setUsers(data);
    };

    const addUser = async (data) => {
        const response = await fetch('http://localhost:8000/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (response.ok) {
            setMessage('Пользователь успешно создан');
            setModalVisible(true);
            fetchUsers();
        }
    };

    const deleteUser = async (id) => {
        const response = await fetch(`http://localhost:8000/users/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            setMessage('Пользователь успешно удален !');
            setModalVisible(true);
            fetchUsers();
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const closeModal = () => {
        setModalVisible(false);
        setMessage('ЗАКРЫТЬ');
    };

    return (
        <div>
            {modalVisible && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <p>{message}</p>
                    </div>
                </div>
            )}
            <UserForm onSubmit={addUser} />
            {users.length === 0 ? (
                <h1>Список пуст </h1>
            ) : (
                <table>
                    <thead>
                    <tr>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>USERNAME </th>
                        <th> ACTIONS</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.username}</td>
                            <td>
                                <button className='delete' onClick={() => deleteUser(user.id)}>DELETE</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default App;
