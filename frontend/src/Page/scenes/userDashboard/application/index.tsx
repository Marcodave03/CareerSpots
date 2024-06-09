import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button } from '@mui/material';
import Header from '../../../../components/Header';
import { Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../../app/store';
import { getMe } from '../../../../features/authSlice';

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
    <Box m="20px">
      <Header title="JOB APPLICATIONS" subtitle="List of Job Applications" />
      <Box m="40px 0 0 0">
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Job History ID</th>
              <th>Application Date</th>
              <th>Status</th>
              <th>User Name</th>
              <th>User Email</th>
              <th>User Role</th>
              <th>Job Name</th>
              <th>Job Type</th>
              <th>Job Location</th>
              <th>Job Salary</th>
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
                  <td>{jobApplication.jobhistoryid}</td>
                  <td>{jobApplication.createdAt || 'N/A'}</td>
                  <td>{jobApplication.status}</td> {/* Status TD */}
                  <td>{jobApplication.User.name}</td>
                  <td>{jobApplication.User.email}</td>
                  <td>{jobApplication.Job.job_name}</td>
                  <td>{jobApplication.Job.job_type}</td>
                  <td>{jobApplication.Job.job_location}</td>
                  <td>{jobApplication.Job.job_salary}</td>
                  <td>
                    <Button
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
                    </Button>
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
