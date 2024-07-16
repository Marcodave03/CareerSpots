import { FormEvent, useEffect, useState } from 'react';
import '../../../Style/messagepage.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../../app/store';
import { getMe } from '../../../../features/authSlice';
import axios from 'axios';


const ComposeMessage = () => {
    const [receiverName, setReceiverName] = useState<string>("");
    const [messageTitle, setMessageTitle] = useState<string>("");
    const [messageContent, setMessageContent] = useState<string>("");
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
            console.log(response.data); 
            setReceiverName(response.data.name);

        } catch (error) {
            console.error("Error fetching jobs:", error);
        }
    };

    useEffect(() => {
        fetchReceiverName();
    }, []);

    const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:5000/createmessage`, {
                "user_id": userID, 
                "receiver_id": id, 
                "message_title": messageTitle, 
                "message_content": messageContent
            });
            navigate("/dashboard/message/sent");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <form className='composeMessageForm' onSubmit={sendMessage}>
                <div className="messageHeader">
                    <p><span>Send To: </span>{receiverName}</p>
                </div>
                <div className="messageHeader">
                    <label>Title: </label>
                    <input
                        type="text"
                        onChange={(e) => setMessageTitle(e.target.value)}
                    />
                </div>
                <div className="messageHeader">
                    <textarea className="messageArea"
                        placeholder="Compose Message here"
                        onChange={(e) => setMessageContent(e.target.value)}></textarea>
                </div>
                <button type="submit" className="btn btn-success" style={{ border: "none", backgroundColor: "#0062FF" }}>Send</button>
            </form>
        </div>
    )
};

export default ComposeMessage;
