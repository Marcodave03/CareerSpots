import { Sequelize } from "sequelize";const db = new Sequelize('careerspotss', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: console.log, 
});

db.authenticate()
    .then(() => {
        console.log('Database connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

export default db;
