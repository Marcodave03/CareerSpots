import { DataTypes } from "sequelize";

const JobApplication = {
  uuid: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  uuid: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  jobhistoryid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: true,
  },
  application_date: { type: DataTypes.DATE, allowNull: true },
  status: { type: DataTypes.STRING, allowNull: true },
  deleted_at: { type: DataTypes.DATE, allowNull: true },
};

export default JobApplication;
