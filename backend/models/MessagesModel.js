import { DataTypes } from "sequelize";

const Messages = {
  message_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: true,
  },
  message_title: { type: DataTypes.TEXT('long'), allowNull: true, field:'message_title'},
  message_content: { type: DataTypes.TEXT('long'), allowNull: true, field:'message_content'}
};

export default Messages;
