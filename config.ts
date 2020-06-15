import * as dotenv from "dotenv";

dotenv.config();
console.log("DATABAAAAAAAAASEEEEE " + process.env.DATABASE_URL)
export const PORT = parseInt(process.env.PORT!);
export const DATABASE_URL = process.env.DATABASE_URL;
// export const DB = process.env.DB!;
// export const DB_USERNAME = process.env.DB_USERNAME!;
// export const DB_PASSWORD = process.env.DB_PASSWORD!;
// export const DB_HOST = process.env.DB_HOST!;