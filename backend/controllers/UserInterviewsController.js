import db from '../models/Association.js';
import Op from "sequelize";

export const createUserInterview = async (req, res) => {
    try {
        const { user_id, interview_id } = req.body;
        const newUserInterview = await db.models.UserInterviews.create({ user_id, interview_id });
        res.status(201).json({ msg: "User Interview created successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

export const getUserInterviewsByUserId = async (req, res) => {
    try {

        const response = await db.models.UserInterviews.findAll({
            where: {
                user_id: req.params.id
            },
            include: [
                { model: db.models.Interviews, attributes: ['interview_name', 'interview_link', 'interview_imagelink', 'interview_prompt'] }
            ]
        });
        res.status(200).json(response);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};
