import express from "express";
import cors from "cors";
import UserRoute from "./routes/UserRoute.js"; //panggil router

const app = express();
//middleware
app.use(cors());
app.use(express.json());
app.use(UserRoute);

app.listen(5000, ()=> console.log('Server up and running...'));