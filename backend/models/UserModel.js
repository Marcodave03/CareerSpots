// import {Sequelize} from "sequelize";
// import db from '../config/Database.js';

// const {DataTypes} = Sequelize; //Function sequelize

// const User = db.define('user',{ //nama tabel
//     name : { type: DataTypes.STRING, allowNull: true }, //field, datanya
//     email : { type: DataTypes.STRING, allowNull: true },
//     gender : { type: DataTypes.STRING, allowNull: true, defaultValue: 'Unknown' },
//     password : { type: DataTypes.STRING, allowNull: true },
//     image : { type: DataTypes.STRING, allowNull: true },
//     url : { type: DataTypes.STRING, allowNull: true }
// },{
//     freezeTableName : true //opsi
// });

// export default User;

// (async()=>{
//     await db.sync(); // Function run ketika dipanggil file UserModel
// })();