import dotenv from "dotenv";
dotenv.config();
export const port = process.env.PORT || 8080;
export const privateKey = process.env.PRIVATE_KEY
export const fullUrl = process.env.URL
export const IsDebug = process.env.mode === 'DEBUG'