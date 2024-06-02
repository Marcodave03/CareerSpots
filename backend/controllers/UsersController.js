import db from '../models/Association.js'; 
import path from "path"; 
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';    

//User
export const getUser = async(req,res)=>{ 
    try{
        const response = await db.models.Users.findAll(); 
        res.status(200).json(response);
    } catch(error){
        console.log(error.message)
    }
}

//count
export const countUser = async (req, res) => {
    try {
        const userCount = await db.models.Users.count();
        res.status(200).json({ count: userCount });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

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
    const fileName = uuidv4() + ext; 
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

export const getUserById = async (req, res) => { 
    try {
        const response = await db.models.Users.findOne({ 
            where: {
                user_id: req.params.user_id 
            }
        });
        res.status(200).json(response);
    } catch(error) {
        console.log(error.message);
    }
};

export const updateUser = async (req, res) => {
    try {
        const userId = req.params.user_id;
        const user = await db.models.Users.findOne({ where: { user_id: userId } });

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        let fileName = user.image_url;

        if (req.files && req.files.file) {
            const file = req.files.file;
            const fileSize = file.data.length;
            const ext = path.extname(file.name);
            fileName = file.md5 + ext;
            const allowedTypes = ['.png', '.jpg', '.jpeg'];

            if (!allowedTypes.includes(ext.toLowerCase())) {
                return res.status(422).json({ msg: "Invalid image format. Allowed formats: .png, .jpg, .jpeg" });
            }
            if (fileSize > 5000000) {
                return res.status(422).json({ msg: "Image size must be less than 5MB" });
            }

            await file.mv(`./public/images/${fileName}`);

            // Delete old image file
            const oldImagePath = `./public/images/${user.image_url}`;
            fs.unlinkSync(oldImagePath);
        }

        const { name, email, password, role } = req.body;
        const imageUrl = `${req.protocol}://${req.get("host")}/images/${fileName}`;

        await db.models.Users.update({ name, email, password, role, image_url: fileName }, {
            where: { user_id: userId }
        });

        res.status(200).json({ msg: "User updated successfully", imageUrl });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};


export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.user_id; 
        const user = await db.models.Users.findOne({ 
            where: {
                user_id: userId 
            }
        });

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        if (user.image) {
            const imagePath = `./public/images/${user.image}`; 
            fs.unlinkSync(imagePath); 
        }

        await db.models.Users.destroy({ 
            where: {
                user_id: userId 
            }
        });

        res.status(200).json({ msg: "User Deleted" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};