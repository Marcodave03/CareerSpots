// StaffModel.js
import { Sequelize } from "sequelize";
import db from '../config/Database.js';
import Users from './UsersModel.js'; // Import User model
import Company from './CompanyModel.js'; // Import Company model
import Job from './JobModel.js'; // Import Job model

const { DataTypes } = Sequelize;

const Staff = db.define('Staff', {
    staff_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true
    }
});

//Staff.belongsTo(Users, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }); // Delete staff if user is deleted
Staff.belongsTo(Company, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }); // Delete staff if company is deleted
Staff.hasMany(Job, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }); 

export default Staff;


(async()=>{
    await db.sync(); // Function run ketika dipanggil file UserModel
})();

