import { DataTypes } from "sequelize";

const Job = {
  uuid: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  job_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  job_name: { type: DataTypes.STRING, allowNull: true, field:'job_name'},
  job_type: { type: DataTypes.STRING, allowNull: true, field:'job_type'},
  job_level: { type: DataTypes.STRING, allowNull: true, field:'job_level'},
  job_location: { type: DataTypes.STRING, allowNull: true, field:'job_location'},
  job_salary: { type: DataTypes.INTEGER, allowNull: true, field:"job_salary" },
  is_hiring: { type: DataTypes.STRING, allowNull: true, field:"is_hiring" },
  company_name: { type: DataTypes.STRING, allowNull: true, field:"company_name"},
};

export default Job;
