import { Box, Container, Stack, Typography, useTheme } from "@mui/material";
import { tokens } from "./theme";
import ImagePlaceholder from "../assets/interviewai.png";

interface ChatBubbleProps {
  content?: string;
  position?: "left" | "right";
}

const ChatBubble = ({ content, position = "right" }: ChatBubbleProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const getBorderRadius = (
    position: "left" | "right",
    radiusSize: number = 12
  ) => {
    if (position === "left")
      return `${radiusSize}px ${radiusSize}px ${radiusSize}px 0px`;

    return `${radiusSize}px ${radiusSize}px 0px ${radiusSize}px`;
  };

  return (
    <Box
      paddingX={1.5}
      paddingY={1}
      sx={{
        border: `1px solid ${colors.custom[400]}`,
        backgroundColor: `${colors.blueAccent[900]}`,
        borderRadius: `${getBorderRadius(position)}`,
        marginRight: position === "left" ? "auto" : "0",
        marginLeft: position === "right" ? "auto" : "0",
        marginY: `12px`,
        width: "fit-content",
      }}
    >
      <Typography>{content}</Typography>
    </Box>
  );
};

const InterviewPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Container sx={{ maxWidth: "1920px" }} maxWidth={false}>
      <Stack direction="column" paddingX={3} paddingY={2} spacing={4}>
        <Box>
          <Typography fontWeight={600} fontSize={24} color={colors.custom[400]}>
            HR Professional: Microsoft Azure
          </Typography>
          <Typography fontWeight={600} fontSize={16}>
            Intern Software Engineer
          </Typography>
        </Box>
        <Stack direction="row" spacing={6}>
          <Box maxWidth="md" flexShrink={0}>
            <img src={ImagePlaceholder} style={{ width: "100%" }} />
          </Box>
          <Stack
            direction="column"
            sx={{
              border: `1px solid ${colors.grey[300]}`,
              width: "100%",
              borderRadius: "8px",
            }}
            paddingX={4}
            paddingY={3}
          >
            <ChatBubble content={`Hello, my name is Budi`} position="right" />
            <ChatBubble content={`Hello, my name is Budi`} position="left" />
            <ChatBubble content={`Hello, my name is Budi`} position="right" />
            <ChatBubble content={`Hello, my name is Budi`} position="right" />
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};


export default InterviewPage;
