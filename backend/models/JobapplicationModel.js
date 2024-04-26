import { Sequelize } from "sequelize";
import db from '../config/Database.js';
import Users from './UserModel.js'; // Import User model
import Job from './JobModel.js'; // Import Job model

const {DataTypes} = Sequelize;

const JobApplication = db.define('JobApplication', {
    jobhistoryid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    application_date: DataTypes.DATE,
    status: DataTypes.STRING,
    deleted_at: DataTypes.DATE
});

// Define associations
JobApplication.belongsTo(Users, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }); // Delete job application if user is deleted
//JobApplication.belongsTo(Job, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }); // Delete job application if job is deleted

export default JobApplication;

(async()=>{
    await db.sync(); // Function run ketika dipanggil file UserModel
})();