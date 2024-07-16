import db from '../models/Association.js';

export const getUserDetailByUserId = async (req, res) => {
    try {
        const response = await db.models.UserDetail.findOne({
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

export const updateUserDetail = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await db.models.Users.findOne({ where: { user_id: userId } });

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        const { user_about, user_phone, user_cv } = req.body;

        await db.models.UserDetail.update({user_about, user_phone, user_cv}, {
            where: { user_id: userId }
        });

        res.status(200).json({ msg: "User updated successfully" });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

