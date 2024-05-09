import {DataTypes} from "sequelize"; 

const JobApplication = {
    jobhistoryid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true
    },
    application_date: { type : DataTypes.DATE, allowNull: true },
    status: { type : DataTypes.STRING, allowNull: true },
    deleted_at: { type : DataTypes.DATE, allowNull: true }
};

export default JobApplication;