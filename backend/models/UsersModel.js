import {DataTypes} from "sequelize"; 


const Users = {
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
};


export default Users;
