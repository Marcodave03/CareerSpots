// CompanyModel.js
import { Sequelize } from "sequelize";
import db from '../config/Database.js';
import Staff from './StaffModel.js';
import Job from "./JobModel.js";

const { DataTypes } = Sequelize;

const Company = db.define('Company', {
    company_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, 
        allowNull: true 
    },
    company_name: { type : DataTypes.STRING, allowNull: true },
    location: { type : DataTypes.STRING, allowNull: true },
    image_url: { type : DataTypes.STRING, allowNull: true } // New attribute for company image URL
});


//Company.hasMany(Staff, { onDelete: 'CASCADE', onUpdate: 'CASCADE' });
//Company.belongsTo(Job, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }); // Delete staff if company is deleted

export default Company;


(async()=>{
    await db.sync(); // Function run ketika dipanggil file UserModel
})();

