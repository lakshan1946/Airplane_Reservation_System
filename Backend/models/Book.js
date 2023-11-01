import pool from '../config/db.js';

class Book {
    static async reserve(Passport_ID, Flight_ID, Seat_No, Class, User_Type) {
        const [result] = await pool.query(
            `call Reserve(?,?,?,?,?)`,
                [Passport_ID, Flight_ID, Seat_No, Class, User_Type]
        )
        return result[0];
    }

    static async get_userpassport(username) {
        const [result] = await pool.query(
            `select Passport_ID from registered_user
            where UserName = ?`,
                [username]
        )
        return result;
    }

    static async get_guestpassport(guestid) {
        const [result] = await pool.query(
            `select Passport_ID from visiting_user
            where User_ID = ?`,
                [guestid]
        )
        return result;
    }
}

export default Book;