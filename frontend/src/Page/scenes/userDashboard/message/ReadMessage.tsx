import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import '../../../Style/messagepage.css';

type MessageProps =
    {
        message_title: string,
        message_content: string,
        sender_id: number,
        sender_name: string,
        message_id: number
    }

const ReadMessage = () => {
    const [messages, setMessages] = useState<any>(
        {
            message_title: "", 
            message_content: "",
            sender_id: -1, 
            sender_name: "", 
            message_id: -1
        }
    );
    let { id } = useParams();
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        getMessageByMessageId();
    }, []);

    const getMessageByMessageId = async () => {
        const response = await axios.get("http://localhost:5000/getmessagebymessageid/" + id);
        console.log(response.data);
        setLoading(false);
        const selectedMessage: MessageProps =
        {
            message_title: response.data.message_title,
            message_content: response.data.message_content,
            sender_id: response.data.User.user_id,
            sender_name: response.data.User.name,
            message_id: response.data.message_id
        }
        setMessages(selectedMessage);
    };
    // console.log(messages); 
    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
            <><div className="messageHeader">
                        <p><span>Sent from: </span>{messages.sender_name}</p>
                    </div><div className="messageHeader">
                            <p><span>Title: </span>{messages.message_title}</p>
                        </div><div className="messageHeader">
                            <p>{messages.message_content}</p>
                        </div>
                        <Link className='inboxButton' to={"/dashboard/message/compose/" + messages.sender_id} style={{ textDecoration: "none" }}>Reply</Link>

                        </>
            )}
        </div>
    )
};

export default ReadMessage;
