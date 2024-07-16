import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button } from '@mui/material';
import Header from '../../../../components/Header';
import { Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../../app/store';
import { getMe } from '../../../../features/authSlice';

function  JobApps({job_id}:any)
{
  const [loading, setLoading] = useState(true);
  const [jobApplications, setJobApplications] = useState<any[]>([]);
  
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

  const fetchJobApplications = async () => {
    try {
      const response = await axios.get<any>(
        "http://localhost:5000/getjobapplicationbyjobid/" + job_id);
      setJobApplications(response.data); 
      console.log(job_id); 
      setLoading(false); 

    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    fetchJobApplications();
  }, [job_id]);

  return(
    <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Application Date</th>
              <th>User Name</th>
              <th>User Email</th>
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
                <tr key={jobApplication.jobhistoryid}>
                  <td>{jobApplication.createdAt || 'N/A'}</td>
                  <td>{jobApplication.User.name}</td>
                  <td>{jobApplication.User.email}</td>
                  <td>{jobApplication.status}</td>
                  <td>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleStatusUpdate(jobApplication.jobhistoryid, 'accepted')}
                    >
                      Accept
                    </Button>
                    <br/>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleStatusUpdate(jobApplication.jobhistoryid, 'rejected')}
                      style={{ marginTop: '10px' }}
                    >
                      Reject
                    </Button>
                    <br/>
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
  )
}

const JobApplicationList = () => {
  const [loading, setLoading] = useState(true);
  const [job, setJobs] = useState<any[]>([]);
  const [staffID, setStaffID] = useState<number>();
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
      }
    }, [isError, isSuccess, user, navigate]);
    useEffect(() => {
      fetchJobByStaffId();
  }, [userID]);
  const fetchJobByStaffId = async () => 
  {
    try {
      const selectedStaff = (await axios.get<any>(`http://localhost:5000/staff/` + userID));
      const staffID = selectedStaff.data.staff_id;  
      const response = await axios.get<any>(
        "http://localhost:5000/jobByStaffId/" + staffID);
      setJobs(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  }
  return (
    <Box m="20px">
      <Header title="JOB APPLICATIONS" subtitle="List of Job Applications" />
      <Box m="40px 0 0 0">
      {job.length > 0 ? (
                job.map((job) => (
                  <><p>{job.job_name}</p><JobApps job_id={job.job_id} /></>
                ))
              ) : (
                <p>No Jobs Found</p>
                // <tr>
                //   <td colSpan={9}>No jobs found</td>
                // </tr>
              )}
      </Box>
    </Box>
  );
};

export default JobApplicationList;
