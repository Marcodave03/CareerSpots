import db from '../models/Association.js';


export const getStaff = async (req, res) => {
    try {
        const staff = await db.models.Staffs.findAll({
            include: [
                { model: db.models.Users, attributes: ['name', 'email', 'role'] },
                { model: db.models.Companies, attributes: ['company_name', 'location'] }
            ]
        });
        res.status(200).json({ staff });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

export const getStaffByUserId = async (req, res) => { 
    try {
        const response = await db.models.Staffs.findOne({ 
            where: {
                user_id: req.params.user_id 
            }
        });
        res.status(200).json(response);
    } catch(error) {
        console.log(error.message);
    }
};

export const getStaffByStaffId = async (req, res) => { 
    try {
        const response = await db.models.Staffs.findOne({ 
            where: {
                staff_id: req.params.id 
            }, 
            include: [
                {
                    model: db.models.Users,
                }
            ],
        });
        res.status(200).json(response);
    } catch(error) {
        console.log(error.message);
    }
};

export const getFellowStaff = async(req, res) => 
{
    try {

        const staff = await db.models.Staffs.findAll({
            where: 
            {
                company_id: req.params.company_id
            },
            include: [
                { model: db.models.Users, attributes: ['name', 'email', 'role'] },
                { model: db.models.Companies, attributes: ['company_name', 'location'] }
            ]
        });
        res.status(200).json({ staff });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}; 

export const createStaff = async (req, res) => {
    try {
        const {company_id } = req.body;
        // const user = await db.models.Users.findByPk(user_id);
        const company = await db.models.Companies.findByPk(company_id);
        if (!company) {
            return res.status(404).json({ msg: "Company not found" });
        }
        const newUser = await db.models.Users.create(req.body);
        await db.models.UserDetail.create(
            {
                user_id: newUser.user_id 
            }
        ); 

        const newStaff = await db.models.Staffs.create({ "user_id": newUser.user_id, company_id });
        res.status(201).json({ msg: "Staff created successfully", staff: newStaff });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};


export const deleteStaff = async(req,res)=>{ 
    try{
        await db.models.Staffs.destroy({
            where:{
                staff_id: req.params.staff_id
            }
        });
        res.status(200).json({msg: "Staff Deleted"});
    } catch(error){
        console.log(error.message)
    }
}