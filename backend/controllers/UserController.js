import User from '../models/UserModel.js';
import Users from  '../models/UsersModel.js';
import path from "path"; //dari node js
import fs from 'fs';

export const getUsers = async(req,res)=>{ //request, response
    try{
        const response = await User.findAll(); //dari model User, findAll() dari sequelize
        res.status(200).json(response);
    } catch(error){
        console.log(error.message)
    }
}


export const getUserss = async(req,res)=>{ //request, response
    try{
        const response = await Users.findAll(); //dari model User, findAll() dari sequelize
        res.status(200).json(response);
    } catch(error){
        console.log(error.message)
    }
}


export const getUserById = async(req,res)=>{ //request, response
    try{
        const response = await User.findOne({ // dari model User
            where:{
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch(error){
        console.log(error.message)
    }
}


export const createUser = async(req,res)=>{ //request, response
    try{
        await User.create(req.body);
        res.status(201).json({msg: "User created"});
    } catch(error){
        console.log(error.message)
    }
}

export const createPhoto = async(req,res)=>{
    if(req.files==null) return res.status(400).json({msg:"No File Uploaded"});
    const name = req.body.title;
    const email = req.body.email;
    const gender = req.body.gender;
    const password = req.body.pass;
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = ['.png','.jpg','.jpeg'];

    if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg:"Invalid Images"});
    if(fileSize>5000000)return res.status(422).json({msg:"Image must be less than 5 mb"});
    file.mv(`./public/images/${fileName}`,async(err)=>{
        if(err) return res.status(500).json({msg:"err.message"});
        try {
            await User.create({name:name, email:email, gender:gender, password:password ,image:fileName,url:url});
            res.status(201).json({msg:"User Created Successfuly"});
        } catch (error) {
            console.log(err.message);
        }
    });
}


export const updateUser = async (req, res) => {
    const user = await User.findOne({
        where: {
            id: req.params.id
        }
    });

    if (!user) {
        return res.status(404).json({ msg: "User not found" });
    }

    let fileName = user.image;

    if (req.files !== null && req.files.file) { // Check if files were uploaded and if file property exists
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedType = ['.png', '.jpg', '.jpeg'];

        if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
        if (fileSize > 5000000) return res.status(422).json({ msg: "Image must be less than 5MB" });

        file.mv(`./public/images/${fileName}`, (err) => {
            if (err) return res.status(500).json({ msg: "Failed to upload image" });
        });

        const filepath = `./public/images/${user.image}`;
        fs.unlinkSync(filepath);
    }

    const { name, email, gender, password } = req.body; // Destructure fields from req.body
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

    try {
        await User.update({ name, email, gender, password, image: fileName, url }, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "User Updated" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}




export const deleteUser = async (req, res) => {
    const user = await User.findOne({ // Finding the user by ID
        where: {
            id: req.params.id
        }
    });
    if (!user) {
        return res.status(404).json({ msg: "User not found" });
    }
    try {
        const filepath = `./public/images/${user.image}`; // Corrected the path by adding a slash after 'images'
        fs.unlinkSync(filepath); // Deleting the associated image file
        await User.destroy({ // Deleting the user from the database
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "User Deleted" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}
