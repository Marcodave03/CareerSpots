import { Sequelize } from "sequelize";
import db from '../config/Database.js';
import Staff from './StaffModel.js';

const {DataTypes} = Sequelize;

const Company = db.define('Company', {
    company_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    company_name: DataTypes.STRING,
    location: DataTypes.STRING,
    image_url: DataTypes.STRING // New attribute for company image URL
});

// Define association
//Company.hasMany(Staff, { onDelete: 'RESTRICT', onUpdate: 'CASCADE' }); 

export default Company;

(async()=>{
    await db.sync(); // Function run ketika dipanggil file UserModel
})();
