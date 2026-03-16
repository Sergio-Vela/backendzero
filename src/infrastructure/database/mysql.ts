import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

export const connectDB = async () => {
    try {
        const connection = await pool.getConnection();
        console.log("Connected to the database successfully.");
        connection.release();
    } catch (error) {
        console.error("Error connecting to the database: ", error);
        throw error;
    }
};