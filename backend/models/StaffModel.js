import { DataTypes } from "sequelize";

const Staff = {
  staff_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: true,
  },
};

export default Staff;
