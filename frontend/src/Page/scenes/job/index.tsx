  import { Box } from "@mui/material";
  import { DataGrid, GridToolbar } from "@mui/x-data-grid";
  import { tokens } from "../../theme";
  import Header from "../../../components/Header";
  import { useTheme } from "@mui/material";
  import { useEffect, useState } from "react";
  import axios from "axios";
  import { Table } from "react-bootstrap";

  // interface Company {
  //   company_name: string;
  //   location: string;
  // }

  // interface Staff {
  //   staff_id: number;
  //   Company: Company;
  // }

  interface Job {
    uuid: string;
    job_id: number;
    job_name: string;
    job_type: string;
    job_location: string;
    job_salary: number;
    is_hiring: boolean;
    staff_id: number;
    // Staff: Staff;
  }


  const Jobs = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  
    const [job, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
      const fetchJobs = async () => {
        try {
          const response = await axios.get<Job[]>("http://localhost:5000/job");
          setJobs(response.data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching jobs:", error);
        }
      };
  
      fetchJobs();
    }, []);


    return (
      <Box m="20px">
        <Header
          title="CONTACTS"
          subtitle="List of Contacts for Future Reference"
        />
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
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${colors.grey[100]} !important`,
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
                  {/* <td>{job.Staff.Company.company_name}</td>
                  <td>{job.Staff.Company.location}</td>
                  <td>{job.is_hiring ? "Yes" : "No"}</td> */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>No jobs found</td>
              </tr>
            )}
            </tbody>
          </Table>)}

        </Box>
      </Box>
    );
  };

  export default Jobs;
