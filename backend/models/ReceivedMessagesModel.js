import { DataTypes } from "sequelize";

const ReceivedMessages = {
  receivedMessage_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: true,
  }
};

export default ReceivedMessages;
