import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button } from '@mui/material';
import Header from '../../../../components/Header';
import { Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../../app/store';
import { getMe } from '../../../../features/authSlice';
import '../../../Style/userdashboard.css';

const JobApplicationList = () => {
  const [jobApplications, setJobApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [job, setJobs] = useState<any[]>([]);
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
  const fetchJobApplications = async () => {
    try {
      if(userID != -1)
      {
        console.log(userID); 
        const response = await axios.get<any>(
          "http://localhost:5000/getjobapplicationbyuserid/" + userID);
        setJobApplications(response.data); 
        console.log(response.data); 
        setLoading(false); 
      }

    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    fetchJobApplications();
  }, [userID]);

  const handleDelete = async (jobApplicationId: any) => {
    try {
      await axios.delete(`http://localhost:5000/jobApplication/${jobApplicationId}`);
      setJobApplications(jobApplications.filter(app => app.jobhistoryid !== jobApplicationId));
    } catch (error) {
      console.error('Error deleting job application:', error);
    }
  };

  const handleStatusUpdate = async (jobApplicationId: any, newStatus: any) => {
    try {
      await axios.post('http://localhost:5000/changejobapplicationstatus', {
        jobApplicationId,
        new_status: newStatus,
      });
      // Refresh job applications after updating status
      fetchJobApplications();
    } catch (error) {
      console.error('Error updating job application status:', error);
    }
  };

  return (
    <Box className="jobAppliPage" m="20px">
      <Header title="JOB APPLICATIONS" subtitle="" />
      <Box m="40px 0 0 0">
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Application Date</th>
              <th>Job Title</th>
              <th>Posted By</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={11}>Loading...</td>
              </tr>
            ) : (
              jobApplications.map((jobApplication) => (
                <tr key={jobApplication.uuid}>
                  <td>{jobApplication.createdAt || 'N/A'}</td>
                  <td>{jobApplication.Job.job_name}</td>
                  <td>{jobApplication.Job.Staff.User.name}</td> 
                  <td>{jobApplication.status}</td>
                  <td>
                  <Link to={`/dashboard/message/compose/${jobApplication.Job.Staff.staff_id}`} style={{color:"white", backgroundColor:"#0062FF", 
      textDecoration:"none", border:"none", padding:"8px", fontSize:"12px", borderRadius:"5px"
      }}>Send Message</Link>
                    {/* <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleStatusUpdate(jobApplication.jobhistoryid, 'accepted')}
                    >
                      Accept
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleStatusUpdate(jobApplication.jobhistoryid, 'rejected')}
                      style={{ marginTop: '10px' }}
                    >
                      Reject
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(jobApplication.jobhistoryid)}
                      style={{ marginTop: '10px' }}
                    >
                      Delete
                    </Button> */}
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

export default JobApplicationList;
