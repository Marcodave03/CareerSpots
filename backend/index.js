import express from "express";
import cors from "cors";
import UserRoute from "./routes/UserRoute.js"; // Import router
import FileUpload from "express-fileupload";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(FileUpload()); // File upload middleware should come first
app.use(express.static("public")); // Serve static files from the 'public' directory
app.use(UserRoute); // Use user router

// Start the server
app.listen(5000, () => console.log('Server up and running...'));