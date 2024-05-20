import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import UserRoute from "./routes/UserRoute.js";
import CompanyRoute from "./routes/CompanyRoute.js";
import JobApplicationRoute from "./routes/JobApplicationRoute.js";
import JobRoute from "./routes/JobRoute.js";
import StaffRoute from "./routes/StaffRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import FileUpload from "express-fileupload";
dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
  db: db,
});

app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: "auto",
    },
  })
);

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(FileUpload());
app.use(express.static("public"));
app.use(UserRoute);
app.use(AuthRoute);
app.use(CompanyRoute);
app.use(JobApplicationRoute);
app.use(JobRoute);
app.use(StaffRoute);

app.listen(5000, () => console.log("Server up and running..."));
