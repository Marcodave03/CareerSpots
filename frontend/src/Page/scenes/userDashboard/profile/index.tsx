import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import '../../../Style/userdashboard.css';
import { AppDispatch } from '../../../../app/store';
import { getMe } from '../../../../features/authSlice';
import Header from '../../../../components/Header';

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
    const [about, setAbout] = useState<string | null>("");
    const [phone, setPhone] = useState<string | null>("");
    const [cv, setCV] = useState<string | null>("");
    const [role, setRole] = useState<string>("");
    const [image, setImage] = useState<string>("");
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
            setRole(userData.role);
            setImage(userData.image_url);

            const detailResponse = await axios.get<any>(`http://localhost:5000/getuserdetailbyuserid/${userID}`);
            setAbout(detailResponse.data.user_about);
            setPhone(detailResponse.data.user_phone);
            setCV(detailResponse.data.user_cv);
            // console.log(userData.name); 
        } catch (error) {
            console.log(error);
        }
    };
    function refreshPage() {
        window.location.reload();
    }

    return (
        <div className="container mt-5 dashboard-content">
            <div className="row">
                <div className="col-md-6">
                    <Header title="PROFILE" subtitle="" />
                    {(image == null) ?
                        (
                            <p className="null-p">
                                set image in edit profile...
                            </p>
                        ) :
                        (
                            <img
                                alt="insert-image"
                                width="100px"
                                height="100px"
                                src={`http://localhost:5000/images/${image}`}
                                style={{ cursor: "pointer", borderRadius: "50%" }}
                            />
                        )
                    }
                    <div className="mb-3 profile-detail">
                        <label htmlFor="name" className="form-label">Name</label>
                        <p>{name}</p>
                    </div>
                    <div className="mb-3 profile-detail">
                        <label htmlFor="name" className="form-label">About</label>
                        {
                            (about == null) ?
                                (
                                    <p className="null-p">
                                        set name in edit profile...
                                    </p>
                                ) :
                                (
                                    <p>{about}</p>
                                )
                        }
                    </div>
                    <div className="mb-3 profile-detail">
                        <label htmlFor="name" className="form-label">Phone</label>
                        {
                            (phone == null) ?
                                (
                                    <p className="null-p">
                                        set phone in edit profile...
                                    </p>
                                ) :
                                (
                                    <p>{phone}</p>
                                )
                        }
                    </div>
                    <div className="mb-3 profile-detail">
                        <label htmlFor="name" className="form-label">CV</label>
                        {
                            (cv == null) ?
                                (
                                    <p className="null-p">
                                        set cv in edit profile...
                                    </p>
                                ) :
                                (
                                    <p>{cv}</p>
                                )
                        }
                    </div>
                    <Link to={"/dashboard/editprofile"} className="btn btn-success" style={{ border: "none", backgroundColor: "#0062FF" }}>Update Profile</Link>
                </div>
            </div>
        </div>
    );
}

export default EditUser;