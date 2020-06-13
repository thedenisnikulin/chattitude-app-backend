import * as dotenv from "dotenv";

dotenv.config();

export const PORT = parseInt(process.env.PORT!);
export const DB = process.env.DB!;
export const DB_USERNAME = process.env.DB_USERNAME!;
export const DB_PASSWORD = process.env.DB_PASSWORD!;
export const DB_HOST = process.env.DB_HOST!;