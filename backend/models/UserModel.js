import {Sequelize} from "sequelize";
import db from '../config/Database.js';

const {DataTypes} = Sequelize; //Function sequelize

const User = db.define('users',{ //nama tabel
    name : DataTypes.STRING, //field, datanya
    email : DataTypes.STRING,
    gender : DataTypes.STRING
},{
    freezeTableName : true //opsi
});

export default User;

(async()=>{
    await db.sync(); // Function run ketika dipanggil file UserModel
})();