import db from '../models/Association.js';

export const getInterview = async (req, res) => {
    try {
        const interviews = await db.models.Interviews.findAll();
        res.status(200).json(interviews);
    } catch (error) {
        onsole.log(error.message)
    }
};

export const getInterviewById = async (req, res) => { 
    try {
        const response = await db.models.Interviews.findOne({ 
            where: {
                interview_id: req.params.id 
            }
        });
        res.status(200).json(response);
    } catch(error) {
        console.log(error.message);
    }
};

