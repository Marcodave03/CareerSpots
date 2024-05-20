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
    image_url: { type : DataTypes.STRING, allowNull: true },
    //url: { type : DataTypes.STRING, allowNull: true }
};

export default Company;

