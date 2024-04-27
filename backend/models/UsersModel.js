import { Sequelize } from "sequelize";
import db from '../config/Database.js';
import Staff from './StaffModel.js';

const {DataTypes} = Sequelize;

const Users = db.define('Users', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true
    },
    name: { type : DataTypes.STRING, allowNull: true },
    email: { type : DataTypes.STRING, allowNull: true },
    password: { type : DataTypes.STRING, allowNull: true },
    role: { type : DataTypes.STRING, allowNull: true },
    image_url: { type : DataTypes.STRING, allowNull: true } // New attribute for user image URL
});

Users.hasOne(Staff);

export default Users;


(async()=>{
    await db.sync(); // Function run ketika dipanggil file UserModel
})();