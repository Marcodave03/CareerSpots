import express from "express";
import cors from "cors";
import mysql from 'mysql';

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "", // Your MySQL password
    database: "crud__db"
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to database: ' + err.stack);
        return;
    }
    console.log('Connected to database as id ' + db.threadId);
});



app.post('/Logins', (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM login WHERE email = ? AND password = ?";
    db.query(sql, [email, password], (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Error" });
        }
        if (data.length > 0) {
            return res.json({ message: "Login Successfully" });
        } else {
            return res.status(404).json({ message: "No Record" });
        }
    });
});


app.listen(5000, ()=> console.log('Server up and running...'));
