import { DataTypes } from "sequelize";

const Users = {
  userDetail_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: true,
  },
  user_about: { type: DataTypes.STRING, allowNull: true },
  user_phone: { type: DataTypes.STRING, allowNull: true },
  user_cv: { type: DataTypes.STRING, allowNull: true }
};

export default Users;
