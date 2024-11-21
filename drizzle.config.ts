import { drizzle } from "drizzle-orm/libsql";
import { vars } from "./src/environment-vars";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
    out: './drizzle',
    schema: './src/database/schema.ts',
    dialect: 'sqlite',
    dbCredentials: {
        url: vars.DB_PATH
    }
})

export const db = drizzle(vars.DB_PATH);