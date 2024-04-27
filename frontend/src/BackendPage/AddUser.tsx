import React, { useState, FormEvent, ChangeEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddUser: React.FC = () => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [gender, setGender] = useState<string>("Male");
    const [password, setPassword] = useState<string>("");
    const [image, setImage] = useState<File | null>(null);
    const [previewURL, setPreviewURL] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedImage = e.target.files[0];
            setImage(selectedImage);
            const imageURL = URL.createObjectURL(selectedImage);
            setPreviewURL(imageURL);
        }
    };

    const saveUser = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('gender', gender);
            formData.append('password', password);
            if (image) {
                formData.append('file', image);
            }
            await axios.post("http://localhost:5000/user", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
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
                    <form onSubmit={saveUser}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Name"
                                style={{ width: '100%' }}
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
                                style={{ width: '100%' }}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="gender" className="form-label">Gender</label>
                            <select
                                className="form-select"
                                id="gender"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                style={{ width: '100%' }}
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                style={{ width: '100%' }}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="image" className="form-label">Image</label>
                            <input
                                type="file"
                                className="form-control"
                                id="image"
                                accept=".png,.jpg,.jpeg"
                                onChange={handleImageChange}
                                style={{ width: '100%' }}
                            />
                            {previewURL && <img src={previewURL} alt="Preview" className="mt-2" style={{ maxWidth: "100%" }} />}
                        </div>
                        <button type="submit" className="btn btn-success">Save</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddUser;
