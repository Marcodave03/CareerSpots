import { Box, Button } from "@mui/material";
import Header from "../../../components/Header";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";

const JobApplicationList = () => {
  const theme = useTheme();
  const [jobApplications, setJobApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobApplications = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getjobapplication");
        setJobApplications(response.data.jobApplications);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching job applications:", error);
      }
    };

    fetchJobApplications();
  }, []);

  const handleDelete = async (jobApplicationId) => {
    try {
      await axios.delete(`http://localhost:5000/jobApplication/${jobApplicationId}`);
      setJobApplications(jobApplications.filter(app => app.jobhistoryid !== jobApplicationId));
    } catch (error) {
      console.error("Error deleting job application:", error);
    }
  };

  return (
    <Box m="20px">
      <Header
        title="JOB APPLICATIONS"
        subtitle="List of Job Applications"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          // Styles for DataGrid
        }}
      >
        {loading ? (
          <p>Loading...</p>
        ) : (
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
              {jobApplications.map((jobApplication) => (
                <tr key={jobApplication.uuid}>
                  <td>{jobApplication.jobhistoryid}</td>
                  <td>{jobApplication.application_date || "N/A"}</td>
                  <td>{jobApplication.status}</td>
                  <td>{jobApplication.User.name}</td>
                  <td>{jobApplication.User.email}</td>
                  <td>{jobApplication.User.role}</td>
                  <td>{jobApplication.Job.job_name}</td>
                  <td>{jobApplication.Job.job_type}</td>
                  <td>{jobApplication.Job.job_location}</td>
                  <td>{jobApplication.Job.job_salary}</td>
                  <td>
                    <Button 
                      variant="contained" 
                      color="error"
                      onClick={() => handleDelete(jobApplication.jobhistoryid)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Box>
    </Box>
  );
};

export default JobApplicationList;
