import React, { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

interface User {
    name: string;
    email: string;
    gender: string;
}

const EditUser: React.FC = () => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [gender, setGender] = useState<string>("Male");
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        getUserById();
    }, []);

    const getUserById = async () => {
        try {
            const response = await axios.get<User>(`http://localhost:5000/users/${id}`);
            const userData: User = response.data;
            setName(userData.name);
            setEmail(userData.email);
            setGender(userData.gender);
        } catch (error) {
            console.log(error);
        }
    }

    const updateUser = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:5000/users/${id}`, {
                name,
                email,
                gender
            });
            navigate("/users");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form onSubmit={updateUser}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Name"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="gender" className="form-label">Gender</label>
                            <select
                                className="form-select"
                                id="gender"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-success">Update</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditUser;
