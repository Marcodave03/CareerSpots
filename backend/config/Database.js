import {Sequelize} from "sequelize";

const db = new Sequelize('crud__db','root','',{  // nama db, user, password
    host:'localhost',
    dialect:'mysql' //dbms yang digunakan
});

export default db;