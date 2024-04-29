import {DataTypes} from "sequelize"; 


const Job = {
    job_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    job_name: { type : DataTypes.STRING, allowNull: true },
    job_type: { type : DataTypes.STRING, allowNull: true },
    job_level: { type : DataTypes.STRING, allowNull: true },
    job_location: { type : DataTypes.STRING, allowNull: true },
    job_salary: { type : DataTypes.FLOAT, allowNull: true },
    is_hiring: { type : DataTypes.BOOLEAN, allowNull: true },
    image_url: { type : DataTypes.STRING, allowNull: true } // New attribute for job image URL
};

export default Job;

// (async()=>{
//     await db.sync(); // Function run ketika dipanggil file UserModel
// })();
