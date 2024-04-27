import db from '../config/Database.js';

const loginModel = {
    login: async (email, password) => {
        try {
            const result = await db.query('SELECT * FROM login WHERE email = ? AND password = ?', {
                replacements: [email, password],
                type: db.QueryTypes.SELECT
            });
            return result;
        } catch (err) {
            throw new Error(err.message);
        }
    }
};

export default loginModel;
