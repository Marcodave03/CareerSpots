import db from '../models/Association.js';

export const createMessage = async (req, res) => {
    try {
        const { user_id } = req.body;
        const user = await db.models.Users.findByPk(user_id);
        if (!user) {
            return res.status(404).json({ msg: "user not found" });
        }
        const newMessage = await db.models.Messages.create(req.body);
        let newMessageId = newMessage.message_id;
        const newReceivedMessage = await db.models.ReceivedMessages.create({ user_id: req.body.receiver_id, message_id: newMessageId });
        res.status(201).json({ msg: "Job created successfully", newMessage, newReceivedMessage });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

export const getMessagesByUserId = async (req, res) => {
    try {
        const response = await db.models.Messages.findAll({
            where: {
                user_id: req.params.id
            }
        });
        res.status(200).json(response);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

export const getMessageByMessageId = async (req, res) => {
    try {
        const response = await db.models.Messages.findOne({
            where: {
                message_id: req.params.id
            }, 
            include: 
            [
                {
                    model: db.models.Users
                }
            ]
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}
