import Users from  '../models/UsersModel.js';
import db from '../models/Association.js'; 
import path from "path"; //dari node js
import fs from 'fs';

export const getUser = async(req,res)=>{ //request, response
    try{
        //const response =  await db.sync({ force: true });; 
        const response = await db.models.Users.findAll(); //dari model User, findAll() dari sequelize
        res.status(200).json(response);
    } catch(error){
        console.log(error.message)
    }
}

export const createUser = async (userData) => {
    try {
        const newUser = await db.models.Users.create(userData);
        console.log("User created:", newUser);
        return newUser;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
};