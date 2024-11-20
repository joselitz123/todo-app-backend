import dotenv from "dotenv";
dotenv.config();

export const vars = {
    DB_PATH: process.env.DB_PATH || '',
    PORT: process.env.PORT || 0,
    OAUTH2_ISSUER_URL: process.env.OAUTH2_ISSUER_URL || '',
    OAUTH2_CLIENT_ID: process.env.OAUTH2_CLIENT_ID || '',
    OAUTH2_CLIENT_SECRET: process.env.OAUTH2_CLIENT_SECRET || '',
    OAUTH2_INTROSPECT_URL: process.env.OAUTH2_INTROSPECT_URL|| '',
    OAUTH2_PUBLIC_KEY: process.env.OATH2_PUBLIC_KEY || '',
    BASE_URL: process.env.BASE_URL || '',
    CLIENT_URL: process.env.CLIENT_URL || '',
    SECRET: process.env.OAUTH_SECRET || ''
}