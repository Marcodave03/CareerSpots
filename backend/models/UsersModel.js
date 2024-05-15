import { DataTypes } from "sequelize";

const Users = {
  uuid: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: true,
  },
  name: { type: DataTypes.STRING, allowNull: true },
  email: { type: DataTypes.STRING, allowNull: true },
  password: { type: DataTypes.STRING, allowNull: true },
  role: { type: DataTypes.STRING, allowNull: true },
  image_url: { type: DataTypes.STRING, allowNull: true }, // New attribute for user image URL
  url: { type: DataTypes.STRING, allowNull: true },
};

export default Users;
