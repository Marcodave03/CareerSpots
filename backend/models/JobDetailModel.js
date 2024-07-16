import { DataTypes } from "sequelize";

const JobDetail = {
    jobDetail_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    job_description: { type: DataTypes.TEXT('long'), allowNull: true, field:'job_description'},
    job_requirement: { type: DataTypes.TEXT('long'), allowNull: true, field:'job_requirement'},
};

export default JobDetail;
