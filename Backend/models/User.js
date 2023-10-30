import pool from '../config/db.js';
import {ymd} from '../helpers/dateTimeFormat.js'

class RegisteredUser {
    static async userRegister(Passport_ID, UserName, Password, First_Name, Last_Name, 
        Phone_No, Gender, email, DOB, Address_line1, Address_line2, City, Country) {
            const DOB_c = ymd(new Date(DOB))
            const [result] = await pool.query(`
            call User_Register(?,?,?,?,?,?,?,?,?,?,?,?,?)`,
                [Passport_ID, UserName, Password, First_Name, Last_Name, Phone_No, Gender, email, DOB_c, Address_line1, Address_line2, City, Country])
        }

    // return user data when Passport_ID is given
    static async getUser(Passport_ID) {
        const [result] = await pool.query(`
        select Passport_ID, UserName, First_Name, Last_Name, email
        from registered_user where Passport_ID = ?`,
            [Passport_ID]
        );
        return result
    }
    
    // return user data when email is given
    static async getUserByEmail(email) {
        const [result] = await pool.query(`
        select Passport_ID, UserName, First_Name, Last_Name, email
        from registered_user where email = ?`,
            [email]
        );
        return result
    }
}

export default RegisteredUser