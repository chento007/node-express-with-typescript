import dotenv from 'dotenv';
dotenv.config({ path: ".env.development" });

export const PORT = process.env.PORT;
export const APP_URL = process.env.APP_URL;
