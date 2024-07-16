import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button } from '@mui/material';
import Header from '../../../../components/Header';
import { Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../../app/store';
import { getMe } from '../../../../features/authSlice';

import '../../../Style/messagepage.css';

function ReceiverName({condition}: any)
{
  const [receiverName, setReceiverName] = useState<string>(""); 
  const fetchReceiverName = async () => {
    try {
        const response = await axios.get<any>(
          "http://localhost:5000/getreceivedmessagesbymessageid/" + condition);

        setReceiverName(response.data[0].User.name); 
        // console.log(response.data[0].User); 
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    fetchReceiverName();
  },[]);

  
  return(
    <td>{receiverName}</td>
  )
}

const SentMessage = () => {
  const [sentMessages, setSentMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userID, setUserID] = useState<number>(-1); 
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
      }
    }, [isError, isSuccess, user, navigate]);
  const fetchSentMessages = async () => {
    try {
      if(userID != -1)
      {
        console.log(userID); 
        const response = await axios.get<any>(
          "http://localhost:5000/getmessagesbyuserid/" + userID);
        setSentMessages(response.data); 
        console.log(response.data); 
        setLoading(false); 
      }

    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    fetchSentMessages();
  }, [userID]);

//   const handleDelete = async (jobApplicationId: any) => {
//     try {
//       await axios.delete(`http://localhost:5000/jobApplication/${jobApplicationId}`);
//       setJobApplications(jobApplications.filter(app => app.jobhistoryid !== jobApplicationId));
//     } catch (error) {
//       console.error('Error deleting job application:', error);
//     }
//   };

//   const handleStatusUpdate = async (jobApplicationId: any, newStatus: any) => {
//     try {
//       await axios.post('http://localhost:5000/changejobapplicationstatus', {
//         jobApplicationId,
//         new_status: newStatus,
//       });
//       // Refresh job applications after updating status
//       fetchJobApplications();
//     } catch (error) {
//       console.error('Error updating job application status:', error);
//     }
//   };

  return (
    <Box m="20px">
      <Header title="SENT" subtitle="your sent messages" />
      <Box m="40px 0 0 0">
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Date</th>
              <th>Sent To</th>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={11}>Loading...</td>
              </tr>
            ) : (
              sentMessages.map((rm) => (
                <tr key={rm.receivedMessage_id}>
                  <td>{rm.createdAt}</td>
                  <ReceiverName condition={rm.message_id} />
                  <td>{rm.message_title}</td>
                  <td>
                     <Link to={"/dashboard/message/sent/" + rm.message_id} className="inboxButton">
                     Read Message
                    </Link>
                    {/* <button className="inboxButton">
                      Read Message
                    </button> */}
                    </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default SentMessage
