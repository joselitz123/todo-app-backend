import { drizzle } from "drizzle-orm/libsql";
import { vars } from "../environment-vars";

export class Database{
    private static instance: Database;
    private connection: ReturnType<typeof drizzle>

    private constructor(){
        this.connection = drizzle({connection: {url: vars.DB_PATH}});
    }

    public static getInstance(){
        if(!Database.instance){
            Database.instance = new Database();
        }
        return Database.instance;
    }

    getConnection(){
        return this.connection;
    }
}