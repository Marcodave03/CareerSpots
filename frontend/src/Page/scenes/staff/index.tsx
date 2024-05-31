import { Box } from "@mui/material";
import Header from "../../../components/Header";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";

interface User {
  name: string;
  email: string;
  role: string;
}

interface Company {
  company_name: string;
  location: string;
}

interface Staff {
  staff_id: number;
  User: User;
  Company: Company;
}

const StaffList = () => {
  const theme = useTheme();
  //const colors = tokens(theme.palette.mode);

  const [staff, setStaff] = useState<Staff[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await axios.get<Staff[]>("http://localhost:5000/staffs");
        setStaff(response.data.staff);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching staff:", error);
      }
    };

    fetchStaff();
  }, []);

  return (
    <Box m="20px">
      <Header
        title="STAFF LIST"
        subtitle="List of Staff Members"
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
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Company</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {staff.length > 0 ? (
                staff.map((staff) => (
                  <tr key={staff.staff_id}>
                    <td>{staff.staff_id}</td>
                    <td>{staff.User.name}</td>
                    <td>{staff.User.email}</td>
                    <td>{staff.User.role}</td>
                    <td>{staff.Company.company_name}</td>
                    <td>{staff.Company.location}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6}>No staff found</td>
                </tr>
              )}
            </tbody>
          </Table>
        )}
      </Box>
    </Box>
  );
};

export default StaffList;
