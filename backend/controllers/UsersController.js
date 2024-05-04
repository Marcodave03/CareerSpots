import Users from  '../models/UsersModel.js';
import db from '../models/Association.js'; 
import path from "path"; //dari node js
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';    

export const getUser = async(req,res)=>{ //request, response
    try{
        //const response =  await db.sync({ force: true });; 
        const response = await db.models.Users.findAll(); //dari model User, findAll() dari sequelize
        res.status(200).json(response);
    } catch(error){
        console.log(error.message)
    }
}

export const createUser = async (req,res) => {
    try {
        await db.models.Users.create(req.body);
        res.status(201).json({msg: "User created"});
        return newUser;
    } catch (error) {
        console.log(error.message);
    }
};

export const createProfile = async (req, res) => {
    if (!req.files || !req.files.file) {
        return res.status(400).json({ msg: "No File Uploaded" });
    }

    const { name, email, role, pass } = req.body;
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = uuidv4() + ext; // Generate a unique filename using UUID
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = ['.png', '.jpg', '.jpeg'];

    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
    if (fileSize > 5000000) return res.status(422).json({ msg: "Image must be less than 5 mb" });

    file.mv(`./public/images/${fileName}`, async (err) => {
        if (err) return res.status(500).json({ msg: err.message });
        
        try {
            await db.models.Users.create({ name, email, role, password: pass, image_url: fileName, url });
            res.status(201).json({ msg: "User Created Successfully" });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ msg: "Internal Server Error" });
        }
    });
};


// export const updateUser = async (req, res) => {
//     const user = await db.models.User.findOne({
//         where: {
//             id: req.params.id
//         }
//     });

//     if (!user) {
//         return res.status(404).json({ msg: "User not found" });
//     }

//     let fileName = user.image;

//     if (req.files !== null && req.files.file) { 
//         const file = req.files.file;
//         const fileSize = file.data.length;
//         const ext = path.extname(file.name);
//         fileName = file.md5 + ext;
//         const allowedType = ['.png', '.jpg', '.jpeg'];

//         if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
//         if (fileSize > 5000000) return res.status(422).json({ msg: "Image must be less than 5MB" });

//         file.mv(`./public/images/${fileName}`, (err) => {
//             if (err) return res.status(500).json({ msg: "Failed to upload image" });
//         });

//         const filepath = `./public/images/${user.image}`;
//         fs.unlinkSync(filepath);
//     }

//     const { name, email, password, role } = req.body;
//     const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

//     try {
//         await db.models.User.update({ name, email, password, role, image: fileName, url }, {
//             where: {
//                 id: req.params.id
//             }
//         });
//         res.status(200).json({ msg: "User Updated" });
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).json({ msg: "Internal Server Error" });
//     }
// }

// export const deleteUser = async (req, res) => {
//     const users = await db.models.Users.findOne({ 
//         where: {
//             user_id: req.params.db.models.Users.id
//         }
//     });
//     if (!users) {
//         return res.status(404).json({ msg: "User not found" });
//     }
//     try {
//         const filepath = `./public/images/${users.image}`; //Corrected the path by adding a slash after 'images'
//         fs.unlinkSync(filepath); //Deleting the associated image file
//         await db.models.Users.destroy({ //Deleting the user from the database
//             where: {
//                 id: req.params.id
//             }
//         });
//         res.status(200).json({ msg: "User Deleted" });
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).json({ msg: "Internal Server Error" });
//     }
// };
export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id; // Extract user id from request parameters
        const user = await db.models.Users.findOne({ 
            where: {
                user_id: userId // Assuming user_id is the correct column name in the Users table
            }
        });

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        const imagePath = `./public/images/${user.image}`; // Path to the user's image
        fs.unlinkSync(imagePath); // Delete the associated image file

        await db.models.Users.destroy({ 
            where: {
                user_id: userId // Delete the user from the database
            }
        });

        res.status(200).json({ msg: "User Deleted" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};


// export const createUser = async(req,res)=>{ //request, response
//     try{
//         await User.create(req.body);
//         res.status(201).json({msg: "User created"});
//     } catch(error){
//         console.log(error.message)
//     }
// }