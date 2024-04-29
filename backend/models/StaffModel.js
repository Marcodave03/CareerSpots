
import {DataTypes} from "sequelize"; 


const Staff = {
    staff_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true
    }
};

// Staff.BelongsTo(User, {
//     foreignKey: "user-id", 
//     onDelete: "CASCADE", 
//     onUpdate: "RESTRICT"
// });
//Staff.belongsTo(Users, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }); // Delete staff if user is deleted
// Staff.belongsTo(Company, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }); // Delete staff if company is deleted
// Staff.hasMany(Job, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }); 
// Staff.belongsTo(Company, {
//     foreignKey: "company_id", 
//     onDelete: "RESTRICT", 
//     onUpdate: "RESTRICT"
// })
// Staff.hasMany(Job, {
//     foreignKey: "staff_id", 
//     onDelete: "RESTRICT", 
//     onUpdate: "RESTRICT"
// })
export default Staff;

