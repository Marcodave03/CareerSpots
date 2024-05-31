import db from '../models/Association.js';
import path from "path"; 
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';  

//Company

export const getCompany = async(req,res)=>{ 
    try{
        const response = await db.models.Companies.findAll();
        res.status(200).json(response);
    } catch(error){
        console.log(error.message)
    }
}

export const getCompanyById = async (req, res) => { 
    try {
        const response = await db.models.Companies.findOne({ 
            where: {
                company_id: req.params.company_id 
            }
        });
        res.status(200).json(response);
    } catch(error) {
        console.log(error.message);
    }
};

export const createCompanys = async (req,res) => {
    try {
        await db.models.Companies.create(req.body);
        res.status(201).json({msg: "Company created"});
    } catch (error) {
        console.log(error.message);
    }
};



export const createCompany = async (req, res) => {
    if (!req.files || !req.files.file) {
        return res.status(400).json({ msg: "No File Uploaded" });
    }

    const { company_name, location } = req.body;
    if (!company_name || !location) {
        return res.status(400).json({ msg: "Company name and location are required" });
    }

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
            // Create the company using the Company model
            await db.models.Companies.create({ company_name, location, image_url: fileName, url });
            res.status(201).json({ msg: "Company Created Successfully" });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ msg: "Internal Server Error" });
        }
    });
};



export const deleteCompany = async (req, res) => {
    try {
        const companyId = req.params.company_id; 
        const company = await db.models.Companies.findOne({ 
            where: {
                company_id: companyId
            }
        });

        if (!company) {
            return res.status(404).json({ msg: "User not found" });
        }

        if (company.image) {
            const imagePath = `./public/images/${company.image}`; 
            fs.unlinkSync(imagePath); 
        }

        await db.models.Companies.destroy({ 
            where: {
                company_id: companyId
            }
        });

        res.status(200).json({ msg: "User Deleted" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

