import { Database } from "../database";
import { eq, getTableColumns } from "drizzle-orm";
import { userTable, areaUserTable } from "../schema";
import { catchError } from "@decorator/catch-error";

export class UserTable {
    private dbConn;
    private userTable;
    private areaUserTable;

    constructor(){
        this.dbConn = Database.getInstance().getConnection();
        this.userTable = userTable;
        this.areaUserTable = areaUserTable;
    }
    
    @catchError
    async insertUser({username, email, name}: {username: string, email: string, name: string}){
       await this.dbConn.insert(this.userTable).values({username, email, name});
       const result = await this.findUser(email);
       return result;
    }

    @catchError
    async findUser(email: string){
        const result = await this.dbConn.select().from(this.userTable).where(eq(userTable.email, email)).limit(1);
        return result.length > 0 ? result[0] : null;
    }

    async getUsersByAreaId(areaId: number){
        const result = await this.dbConn.select(getTableColumns(this.userTable))
        .from(this.userTable)
        .rightJoin(this.areaUserTable, eq(this.userTable.user_id, this.areaUserTable.user_id))
        .where(eq(this.areaUserTable.area_id, areaId));
        return result;
    }

}