import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../../components/Header";
import { mockDataTeam } from "../../../data/mockData";
import { Button } from '@mui/material';

const handleEditClick = (id: number) => {
  // Handle edit action
  console.log('Edit', id);
};

const handleDeleteClick = (id: number) => {
  // Handle delete action
  console.log('Delete', id);
};

const JobsApplied = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID" },
    {
      field: "jobname",
      headerName: "Job Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "jobsalary",
      headerName: "Salary",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "jobtype",
      headerName: "Job Type",
      flex: 1,
    },
    {
      field: "joblevel",
      headerName: "Job Level",
      flex: 1,
    },
    {
      field: "joblocation",
      headerName: "Job Location",
      flex: 1,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params: GridRenderCellParams) => (
        <div>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handleEditClick(params.id)}
            style={{ marginRight: 16 }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => handleDeleteClick(params.id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="Jobs" subtitle="List of Existing Jobs" />
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
        }}
      >
        <DataGrid checkboxSelection rows={mockDataTeam} columns={columns} />
      </Box>
    </Box>
  );
};

export default JobsApplied;
