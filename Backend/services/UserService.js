import RegisteredUser from "../models/User";

class UserService {
    static async register(userData, callback) {
        const data = userData.body;

        try {
            await RegisteredUser.userRegister(
                data.passportID,
                data.username,
                data.password,
                data.firstname,
                data.lastname,
                data.phone,
                data.gender,
                data.email,
                data.dob,
                data.line1,
                data.line2,
                data.city,
                data.country
            );

            return callback.json({ success: true, message: 'User registered successfully' });
        } catch (error) {
            console.error('Error registering user:', error)
            if (typeof callback === 'function') {
                callback(error, null);
            } else {
                console.error('Callback is not a function');
            }
        }        
    }
};

export default UserService;