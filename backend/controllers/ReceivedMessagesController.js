import db from '../models/Association.js';
import Op from "sequelize";

export const getReceivedMessagesByUserId = async (req, res) => {
    try {

        const response = await db.models.ReceivedMessages.findAll({
            where: {
                user_id: req.params.id
            },
            include:[
            {
                    model: db.models.Messages, 
                    include:[
                    {
                        model: db.models.Users
                    }
                    ]
                    // through: {attributes: ['user_id']}
            }]
        });
        res.status(200).json(response);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

export const getReceivedMessagesByMessageId = async (req, res) => {
    try {

        const response = await db.models.ReceivedMessages.findAll({
            where: {
                message_id: req.params.id
            },
            include:[
                {
                        model: db.models.Users, 
                }]
        });
        res.status(200).json(response);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

