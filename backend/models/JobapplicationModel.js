import { Sequelize } from "sequelize";
import db from '../config/Database.js';
import Users from './UserModel.js'; // Import User model
import Job from './JobModel.js'; // Import Job model

const {DataTypes} = Sequelize;

const JobApplication = db.define('JobApplication', {
    jobhistoryid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true
    },
    application_date: { type : DataTypes.DATE, allowNull: true },
    status: { type : DataTypes.STRING, allowNull: true },
    deleted_at: { type : DataTypes.DATE, allowNull: true }
});


//JobApplication.belongsTo(Users, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }); // Delete job application if user is deleted
//JobApplication.belongsTo(Job, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }); // Delete job application if job is deleted

export default JobApplication;



(async()=>{
    await db.sync(); // Function run ketika dipanggil file UserModel
})();