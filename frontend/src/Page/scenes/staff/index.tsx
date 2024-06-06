import { Box, Button, accordionSummaryClasses } from "@mui/material";
import Header from "../../../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../../../features/authSlice";
import { AppDispatch } from "../../../app/store";

interface User {
  name: string;
  email: string;
  role: string;
}

interface Company {
  company_name: string;
  location: string;
  company_id: number;
}

interface Staff {
  staff_id: number;
  User: User;
  Company: Company;
}

const StaffList = () => {
  const [staff, setStaff] = useState<Staff[]>([]);
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
          // console.log(userID); 
      }
    }, [isError, isSuccess, user, navigate]);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const selectedStaff = (await axios.get<any>(`http://localhost:5000/staff/` + userID));
        const companyID = selectedStaff.data.company_id;  
        console.log(companyID); 
        const response = await axios.get<{ staff: Staff[] }>("http://localhost:5000/fellowstaffs/" + companyID);
        setStaff(response.data.staff);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching staff:", error);
      }
    };

    fetchStaff();
  }, [userID]);


  return (
    <Box m="20px">
      <Header
        title="STAFF LIST"
        subtitle="List of Staff Members"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
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
                  <td colSpan={7}>No staff found</td>
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
