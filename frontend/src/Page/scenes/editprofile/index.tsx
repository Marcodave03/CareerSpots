import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AppDispatch } from "../../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../../../features/authSlice";
import '../../Style/userdashboard.css';
import Header from '../../../components/Header';

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
    const [about, setAbout] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [cv, setCV] = useState<string>("");
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
        if (user) {
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
            const detailResponse = await axios.get<any>(`http://localhost:5000/getuserdetailbyuserid/${userID}`);
            if (detailResponse.data.user_about == null) {
                setAbout("");
            }
            else {
                setAbout(detailResponse.data.user_about);
            }
            if (detailResponse.data.user_phone == null) {
                setPhone("");
            }
            else {
                setPhone(detailResponse.data.user_phone);
            }
            if (detailResponse.data.user_cv == null) {
                setCV("");
            }
            else {
                setCV(detailResponse.data.user_cv);
            }
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
            console.log("sampe sini"); 
            await axios.patch(`http://localhost:5000/users/${userID}`, {
                "name": name,
                "password": password
            });
            // console.log({about, phone, cv}); 
            await axios.patch(`http://localhost:5000/updateuserdetail/${userID}`,
                {
                    "user_about": about,
                    "user_phone": phone,
                    "user_cv": cv
                });
                window.location.reload();
            // const formData = new FormData();
            // formData.append('name', name);
            // formData.append('email', email);
            // formData.append('password', password);
            // formData.append('role', role);
            // if (image) {
            //     formData.append('file', image);
            // }
            // await axios.patch(`http://localhost:5000/users/${userID}`, formData, {
            //     headers: {
            //         'Content-Type': 'multipart/form-data'
            //     }
            // });
            // navigate("/dashboard/profile");
        } catch (error) {
            console.log(error);
        }
    }

    function refreshPage() {
        window.location.reload();
    }

    return (
        <div className="container mt-5 dashboard-content">
            <div className="row">
                <div className="col-md-6">
                    <Header title="EDIT PROFILE" subtitle="" />
                    <Link to={"/dashboard/profile"} style={{ fontSize:"15px"}}> back</Link>
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
                        <div className="mb-3">
                            <label htmlFor="about" className="form-label">About</label>
                            <textarea
                                className="form-control"
                                id="about"
                                value={about}
                                onChange={(e) => setAbout(e.target.value)}
                                placeholder="About"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">Phone</label>
                            <input
                                type="text"
                                className="form-control"
                                id="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="Phone"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cv" className="form-label">CV</label>
                            <input
                                type="text"
                                className="form-control"
                                id="cv"
                                value={cv}
                                onChange={(e) => setCV(e.target.value)}
                                placeholder="CV"
                            />
                        </div>
                        <button type="submit"  className="btn btn-success" style={{ border: "none", backgroundColor: "#0062FF" }}>Update</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditUser;
