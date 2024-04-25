import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";

interface User {
    id: number;
    name: string;
    email: string;
    gender: string;
}

const UserList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        try {
            const response = await axios.get<User[]>('http://localhost:5000/users');
            setUsers(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteUser = async (id: number) => {
        try {
            await axios.delete(`http://localhost:5000/users/${id}`);
            getUsers();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <Link to={`/add`} className='btn btn-success mb-2'>Add New</Link>
                    <Link to={`/login`} className='btn btn-info ml-2 mb-2'>New Account</Link>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Gender</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user.id}>
                                    <td>{index + 1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.gender}</td>
                                    <td>
                                        <Link to={`/edit/${user.id}`} className='btn btn-sm btn-info'>Edit</Link>
                                        <button onClick={() => deleteUser(user.id)} className='btn btn-sm btn-danger ml-2'>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default UserList;
