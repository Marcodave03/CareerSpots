import { Sequelize } from "sequelize";
import db from '../config/Database.js';
import Staff from './StaffModel.js';

const {DataTypes} = Sequelize;

const Users = db.define('Users', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    image_url: DataTypes.STRING // New attribute for user image URL
});

// Define association
Users.hasOne(Staff);

export default Users;

(async()=>{
    await db.sync(); // Function run ketika dipanggil file UserModel
})();