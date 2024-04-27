import { Sequelize } from "sequelize";
import db from '../config/Database.js';
import Staff from './StaffModel.js';
import Company from './CompanyModel.js'
import JobApplication from './JobapplicationModel.js'; // Import JobApplication model

const {DataTypes} = Sequelize;

const Job = db.define('Job', {
    job_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    job_name: { type : DataTypes.STRING, allowNull: true },
    job_type: { type : DataTypes.STRING, allowNull: true },
    job_level: { type : DataTypes.STRING, allowNull: true },
    job_location: { type : DataTypes.STRING, allowNull: true },
    job_salary: { type : DataTypes.FLOAT, allowNull: true },
    is_hiring: { type : DataTypes.BOOLEAN, allowNull: true },
    image_url: { type : DataTypes.STRING, allowNull: true } // New attribute for job image URL
});


//Job.belongsTo(Staff, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }); // Assuming each job belongs to a staff member
Job.hasMany(JobApplication, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }); // Delete job applications if job is deleted

export default Job;

(async()=>{
    await db.sync(); // Function run ketika dipanggil file UserModel
})();
