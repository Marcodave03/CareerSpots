import { DataTypes } from "sequelize";

const Interview = {

  interview_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: true,
  },
  interview_name: { type: DataTypes.STRING, allowNull: true },
  interview_link: { type: DataTypes.STRING, allowNull: true },
  interview_imagelink: {type: DataTypes.STRING, allowNull: true},  
  interview_prompt: { type: DataTypes.STRING, allowNull: true }
};

export default Interview;
