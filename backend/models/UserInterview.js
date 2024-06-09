import { DataTypes } from "sequelize";

const UserInterview = {
    userinterview_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true,
    }
};

export default UserInterview;
