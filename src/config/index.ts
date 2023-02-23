import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const { NODE_ENV, PORT, SECRET_KEY, LOG_FORMAT, LOG_DIR, ORIGIN } = process.env;
export const snowflakeConfig  = {

            account: "qjtlsgh-fz50686",
            username: "sm107", 
            password: "Santi!39",
            warehouse: "BAGIS_WH",
            role: "ACCOUNTADMIN",
            database: 'OPENALEX',
            schema: 'OPENALEX' // Create a role for API calls
}
