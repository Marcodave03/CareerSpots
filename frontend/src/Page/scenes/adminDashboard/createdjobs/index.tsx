import { Box, Button } from "@mui/material";
import Header from "../../../../components/Header";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../app/store";
import { getMe } from "../../../../features/authSlice";

interface Company {
  company_name: string;
  location: string;
}

interface Staff {
  staff_id: number;
  Company: Company;
}

interface Job {
  uuid: string;
  job_id: number;
  job_name: string;
  job_type: string;
  job_location: string;
  job_salary: number;
  is_hiring: boolean;
  staff_id: number;
  Staff: Staff;
}

const Jobs = () => {
  const theme = useTheme();
  const [job, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
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
    const fetchJobs = async () => {
      try {
        const selectedStaff = (await axios.get<any>(`http://localhost:5000/staff/` + userID));
        // console.log(userID); 
        // console.log(selectedStaff); 
        const staffID = selectedStaff.data.staff_id;  
        const response = await axios.get<any>(
          "http://localhost:5000/jobByStaffId/" + staffID);
        setJobs(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, [userID]);

  const deleteJob = async (jobId: number) => {
    try {
      await axios.delete(`http://localhost:5000/job/${jobId}`);
      setJobs(job.filter((j) => j.job_id !== jobId));
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  return (
    <Box m="20px">
      <Header title="JOBS" subtitle="List of Jobs" />
      <Link to={"/staffdashboard/createjob"} className="btn btn-success" style={{ border: "none", backgroundColor: "#0062FF" }}>Create Job</Link>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: theme.palette.success.main,
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.primary.dark,
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.background.default,
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: theme.palette.primary.dark,
          },
          "& .MuiCheckbox-root": {
            color: `${theme.palette.success.light} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.grey[100]} !important`,
          },
        }}
      >
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Job Name</th>
                <th>Job Type</th>
                <th>Location</th>
                <th>Salary</th>
                <th>Company</th>
                <th>Company Location</th>
                <th>Hiring</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {job.length > 0 ? (
                job.map((job) => (
                  <tr key={job.uuid}>
                    <td>{job.job_id}</td>
                    <td>{job.job_name}</td>
                    <td>{job.job_type}</td>
                    <td>{job.job_location}</td>
                    <td>${job.job_salary}</td>
                    <td>{job.Staff.Company.company_name}</td>
                    <td>{job.Staff.Company.location}</td>
                    <td>{job.is_hiring ? "Yes" : "No"}</td>
                    <td>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => deleteJob(job.job_id)}
                      >
                        Delete
                      </Button>
                      <Button
                        style={{ marginLeft: "10px" }}
                        variant="contained"
                        color="secondary"
                      >
                        <Link
                          style={{ textDecoration: "none" }}
                          to={`/staffdashboard/editjob/${job.job_id}`}
                        >
                          Edit
                        </Link>
                      </Button>
                      {}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9}>No jobs found</td>
                </tr>
              )}
            </tbody>
          </Table>
        )}
      </Box>
    </Box>
  );
};

export default Jobs;
