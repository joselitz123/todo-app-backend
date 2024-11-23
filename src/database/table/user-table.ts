import { Database } from "../database";
import { eq } from "drizzle-orm";
import { userTable } from "../schema";
import { catchError } from "@decorator/catch-error";

export class UserTable {
    private dbConn;
    private userTable ;

    constructor(){
        this.dbConn = Database.getInstance().getConnection();
        this.userTable = userTable;
    }
    
    @catchError
    async insertUser({username, email, name}: {username: string, email: string, name: string}){
       await this.dbConn.insert(this.userTable).values({username, email, name});
       const result = await this.findUser(email);
       return result;
    }

    @catchError
    async findUser(email: string){
        const result = await this.dbConn.select().from(userTable).where(eq(userTable.email, email)).limit(1);
        return result.length > 0 ? result[0] : null;
    }

}