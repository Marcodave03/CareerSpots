import { useEffect, useState } from 'react';
import '../../../Style/messagepage.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../../app/store';
import { getMe } from '../../../../features/authSlice';
import axios from 'axios';


const ComposeMessage = () => {
    const [receiverName, setReceiverName] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [userID, setUserID] = useState<number>(-1);
    const navigate = useNavigate();
    let { id } = useParams();

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
        }
    }, [isError, isSuccess, user, navigate]);
    const fetchReceiverName = async () => {
        try {
            const response = await axios.get("http://localhost:5000/users/" + id);
            setReceiverName(response.data.name); 

        } catch (error) {
            console.error("Error fetching jobs:", error);
        }
    };

    useEffect(() => {
        fetchReceiverName();
    }, []);
    return (
        <div>
            <form className='composeMessageForm'>
                <div className="messageHeader">
                    <label>Send To: </label>
                    {/* <input 
                        type="text"
                    /> */}
                </div>
                <div className="messageHeader">
                    <label>Title: </label>
                    <input 
                        type="text"
                    />
                </div>
                <div className="messageHeader">
                <textarea className="messageArea" placeholder="Compose Message here"></textarea>
                </div>
                <button type="submit" className="btn btn-success" style={{border:"none", backgroundColor:"#0062FF"}}>Send</button>
            </form>
        </div>
    )
};

export default ComposeMessage;
