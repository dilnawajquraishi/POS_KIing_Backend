const User = require('../Models/ResetPassword'); // Adjust the path as necessary

const changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user._id; // Assume user ID is attached to the request (e.g., from a JWT)

    if (!oldPassword || !newPassword) {
        return res.status(400).json({ success: false, message: 'Old and new passwords are required' });
    }

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Check if the old password is correct
        const isMatch = await user.comparePassword(oldPassword);

        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Old password is incorrect' });
        }

        // Update to the new password
        user.password = newPassword;
        await user.save();

        res.status(200).json({ success: true, message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating password', error: error.message });
    }
};

module.exports = changePassword;
