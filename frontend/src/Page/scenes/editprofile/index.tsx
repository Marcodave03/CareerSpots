import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { AppDispatch } from "../../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../../../features/authSlice";

interface User {
    name: string;
    email: string;
    password: string;
    role: string;
    image_url: string;
    url: string;
}

const EditUser: React.FC = () => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [role, setRole] = useState<string>("");
    const [image, setImage] = useState<File | null>(null);
    const [previewURL, setPreviewURL] = useState<string | null>(null);
    const [userID, setUserID] = useState<number>(); 
    const navigate = useNavigate();

    const { isError, user, isSuccess } = useSelector((state: any) => state.auth);
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(getMe());
      }, [dispatch]);
      useEffect(() => {
        if (isError) {
          navigate("/");
        }
        if(user)
        {
            setUserID(user.user_id);
            console.log(userID); 
        }
      }, [isError, isSuccess, user, navigate]);

      useEffect(() => {
        getUserById();
    }, [userID]);

    const getUserById = async () => {
        try {
            const response = await axios.get<User>(`http://localhost:5000/users/${userID}`);
            const userData: User = response.data;
            setName(userData.name);
            setEmail(userData.email);
            setPassword(userData.password);
            setRole(userData.role);

            // console.log(userData.name); 
        } catch (error) {
            console.log(error);
        }
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedImage = e.target.files[0];
            setImage(selectedImage);
            const imageURL = URL.createObjectURL(selectedImage);
            setPreviewURL(imageURL);
        }
    };

    const updateUser = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('role', role);
            if (image) {
                formData.append('file', image);
            }
            await axios.patch(`http://localhost:5000/users/${userID}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            // navigate("/dashboard/profile");
        } catch (error) {
            console.log(error);
        }
    }

    function refreshPage(){ 
        window.location.reload(); 
    }

    return (
        <div className="container mt-5">
            <div className="row">
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
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
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
                            />
                            {previewURL && <img src={previewURL} alt="Preview" className="mt-2" style={{ maxWidth: "100%" }} />}
                        </div>
                        <button type="submit" onClick={refreshPage} className="btn btn-success" style={{border:"none", backgroundColor:"#0062FF"}}>Update</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditUser;
