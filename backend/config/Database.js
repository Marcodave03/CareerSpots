// import {Sequelize} from "sequelize";

// const db = new Sequelize('crud__db','root','',{  // nama db, user, password
//     host:'localhost',
//     dialect:'mysql' //dbms yang digunakan
// });

// export default db;

import { Sequelize } from "sequelize";

const db = new Sequelize('crud__db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: console.log, // Log all SQL queries to the console
});

db.authenticate()
    .then(() => {
        console.log('Database connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

export default db;
