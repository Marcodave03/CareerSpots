import { Box } from "@mui/material";
import { DataGrid, GridToolbar, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../../components/Header";
import { useTheme } from "@mui/material";
import { mockDataContacts } from "../../../data/mockData";
import { Button } from '@mui/material';

const handleEditClick = (id: number) => {
  // Handle edit action
  console.log('Edit', id);
};

const handleDeleteClick = (id: number) => {
  // Handle delete action
  console.log('Delete', id);
};

const Applicants = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns: GridColDef[]  = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "registrarId", headerName: "Registrar ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    // {
    //   field: "age",
    //   headerName: "Age",
    //   type: "number",
    //   headerAlign: "left",
    //   align: "left",
    // },
    // {
    //   field: "phone",
    //   headerName: "Phone Number",
    //   flex: 1,
    // },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    // {
    //   field: "address",
    //   headerName: "Address",
    //   flex: 1,
    // },
    // {
    //   field: "city",
    //   headerName: "City",
    //   flex: 1,
    // },
    // {
    //   field: "zipCode",
    //   headerName: "Zip Code",
    //   flex: 1,
    // },
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
      <Header
        title="Applicants"
        subtitle="List of Applicants History"
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
        <DataGrid
          rows={mockDataContacts}
          columns={columns}
          // components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Applicants;
