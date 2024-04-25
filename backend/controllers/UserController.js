import User from '../models/UserModel.js';

export const getUsers = async(req,res)=>{ //request, response
    try{
        const response = await User.findAll(); //dari model User, findAll() dari sequelize
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

export const updateUser = async(req,res)=>{ //request, response
    try{
        await User.update(req.body,{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "User Updated"});
    } catch(error){
        console.log(error.message)
    }
}

export const deleteUser = async(req,res)=>{ //request, response
    try{
        await User.destroy({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "User Deleted"});
    } catch(error){
        console.log(error.message)
    }
}