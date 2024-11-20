import { drizzle } from "drizzle-orm/libsql";
import { vars } from "../environment-vars";


export const db = drizzle(vars.DB_PATH);