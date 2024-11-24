import { Database } from "../database";
import { eq } from "drizzle-orm";
import { areaUserTable } from "../schema";
import { catchError } from "@decorator/catch-error";

export enum Roles {
    Admin = "admin",
    Edit = "edit",
    Read = "read"
}

export class AreaUserTable {
    private dbConn;
    private areaUserTable;

    constructor(){
        this.dbConn = Database.getInstance().getConnection();
        this.areaUserTable = areaUserTable;
    }

    @catchError
    async insertAreaUser(userId: number, areaId: number, role: Roles){
        await this.dbConn.insert(this.areaUserTable).values({user_id: userId, area_id: areaId, role})
    }
}