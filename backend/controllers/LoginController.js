import loginModel from '../models/LoginModel.js';

const loginController = {
    loginUser: async (req, res) => {
        const { email, password } = req.body;
        try {
            const data = await loginModel.login(email, password);
            if (data.length > 0) {
                return res.json({ message: "Login Successfully" });
            } else {
                return res.status(404).json({ message: "No Record" });
            }
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }
};

export default loginController;
