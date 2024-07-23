const User = require('../models/userModel');

const handleFormSubmission = async (req, res) => {
    const { name, email, place, college, password, confirmPassword } = req.body;

    if (!name || !email || !place || !college || !password || password !== confirmPassword) {
        return res.status(400).json({ message: 'Invalid form data' });
    }

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Directly create the user (Note: Passwords should be hashed ideally)
        const user = await User.create({ name, email, place, college, password });

        console.log('User:', user);

        res.status(200).json({ message: 'Registration Successful', data: user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


    const handleLogin = async (req, res) => {
        const { email, password } = req.body;
    
        try {
            const user = await User.findOne({ email });
    
            if (user && user.password === password) { // Compare passwords (should be hashed ideally)
                res.status(200).json({ success: true, message: 'Login successful', user });
            } else {
                res.status(401).json({ success: false, message: 'Invalid email or password' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    };
    

    

module.exports = {
    handleFormSubmission,
    handleLogin

};
