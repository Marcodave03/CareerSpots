import Users from  '../models/UsersModel.js';
import db from '../models/Association.js'; 
import path from "path"; //dari node js
import fs from 'fs';

// export const createUser = async (req, res) => {
//     try {
//         const { name, email, password, role, image_url } = req.body;
        
//         const newUser = await db.create({
//             name,
//             email,
//             password,
//             role,
//             image_url
//         });

//         res.status(201).json({ success: true, data: newUser });
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// };

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