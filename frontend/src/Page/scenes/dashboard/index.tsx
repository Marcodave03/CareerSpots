import React from "react";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AwaitingIcon from '@mui/icons-material/HourglassBottom';
// import EmailIcon from "@mui/icons-material/Email";
// import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import ReviewIcon from '@mui/icons-material/Grading';
// import TrafficIcon from "@mui/icons-material/Traffic";
import RejectIcon from '@mui/icons-material/CancelPresentation';
import Header from "../../../components/Header";
import LineChart from "../../../components/LineChart";
import BarChart from "../../../components/BarChart";
import StatBox from "../../../components/StatBox";
import GeographyChart from "../../../components/GeographyChart";
import ProgressCircle from "../../../components/ProgressCircle";

interface Transaction {
  txId: string;
  user: string;
  date: string;
  cost: number;
}

const mockTransactions: Transaction[] = []; // Define your mock transactions here

const Dashboard: React.FC = () => {
  const theme = useTheme(); // No need to explicitly type the return value of useTheme, it's inferred by TypeScript
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard"  />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.custom[400],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ marginRight: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="12,361"
            subtitle="Awaiting"
            progress={0.75}
            increase="+14%"
            icon={
              <AwaitingIcon
                sx={{ color: colors.custom[400], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="431,225"
            subtitle="Reviewed"
            progress={0.50}
            increase="+21%"
            icon={
              <ReviewIcon
                sx={{ color: colors.custom[400], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="32,441"
            subtitle="Hired"
            progress={0.30}
            increase="+5%"
            icon={
              <PersonAddIcon
                sx={{ color: colors.custom[400], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="1,325,134"
            subtitle="Rejected"
            progress={0.80}
            increase="+43%"
            icon={
              <RejectIcon
                sx={{ color: colors.custom[400], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Acceptance Status Statistics
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                32,441 Accepted
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.custom[400] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" marginTop="-20px">
            <LineChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            padding="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Job Positions Filled
            </Typography>
          </Box>
          {mockTransactions.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              padding="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.txId}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.user}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.date}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                padding="5px 10px"
                borderRadius="4px"
                
              >
                ${transaction.cost}
              </Box>
            </Box>
          ))}
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Acceptance Rate
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            marginTop="25px"
          >
            <ProgressCircle size="125" />
            <Typography
              variant="h5"
              color={colors.custom[400]}
              marginTop="15px"
            >
              25% of Candidates Accepted
            </Typography>
            <Typography color={colors.greenAccent[500]}>75% of Candidates Rejected</Typography>
          </Box>
        </Box>
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            padding="30px 30px 0 30px"
          >
            Job Positions Statistics
          </Typography>
          <Box height="250px" marginTop="-20px">
            <BarChart isDashboard={true} /> 
          </Box>
        </Box>
          {/* <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Geography Based Traffic
          </Typography>
          <Box height="200px">
            <GeographyChart isDashboard={true} />
          </Box> */}
        </Box>
      </Box>
    // </Box>
  );
};

export default Dashboard;
