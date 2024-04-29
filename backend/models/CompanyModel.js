import {DataTypes} from "sequelize"; 

const Company = {
    company_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, 
        allowNull: true 
    },
    company_name: { type : DataTypes.STRING, allowNull: true },
    location: { type : DataTypes.STRING, allowNull: true },
    image_url: { type : DataTypes.STRING, allowNull: true } // New attribute for company image URL
};


//Company.hasMany(Staff, { onDelete: 'CASCADE', onUpdate: 'CASCADE' });
//Company.belongsTo(Job, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }); // Delete staff if company is deleted
// Company.hasMany(Staff, {
//     foreignKey: "company_id", 
//     onDelete: "RESTRICT", 
//     onUpdate: "RESTRICT"
// })

export default Company;


// (async()=>{
//     await db.sync(); // Function run ketika dipanggil file UserModel
// })();

