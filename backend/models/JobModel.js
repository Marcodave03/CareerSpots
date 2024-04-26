import { Sequelize } from "sequelize";
import db from '../config/Database.js';
import Staff from './StaffModel.js';
import JobApplication from './JobapplicationModel.js'; // Import JobApplication model

const {DataTypes} = Sequelize;

const Job = db.define('Job', {
    job_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    job_name: DataTypes.STRING,
    job_type: DataTypes.STRING,
    job_level: DataTypes.STRING,
    job_location: DataTypes.STRING,
    job_salary: DataTypes.FLOAT,
    is_hiring: DataTypes.BOOLEAN,
    image_url: DataTypes.STRING // New attribute for job image URL
});

// Define association
//Job.belongsTo(Staff, { foreignKey: 'posted_by', onDelete: 'CASCADE', onUpdate: 'CASCADE' }); // Delete job if staff member who posted it is deleted
Job.hasMany(JobApplication, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }); // Delete job applications if job is deleted

export default Job;

(async()=>{
    await db.sync(); // Function run ketika dipanggil file UserModel
})();
