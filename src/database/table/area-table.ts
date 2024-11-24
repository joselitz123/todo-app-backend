import { Database } from "../database";
import { eq, and, getTableColumns } from "drizzle-orm";
import { areaTable, areaUserTable } from "../schema";
import { catchError } from "@decorator/catch-error";


export class AreaTable {
    private dbConn;
    private areaTable;
    private areaUserTable;

    constructor(){
        this.dbConn = Database.getInstance().getConnection();
        this.areaTable = areaTable;
        this.areaUserTable = areaUserTable;
    }

    @catchError
    async insertAreaTodo(areaName: string){
        const insertData = await this.dbConn.insert(this.areaTable).values({name: areaName }).returning();
        return insertData;
    }

    @catchError
    async findArea(areaName: string){
        await this.dbConn.select().from(this.areaTable).where(eq(this.areaTable.name, areaName));
    }
    
    @catchError
    async findAreaBasedOnUserIdAndAreaName(userId: number, areaName: string){
        const result = await this.dbConn.select().from(this.areaTable)
        .leftJoin(this.areaUserTable, eq(this.areaTable.area_id, this.areaUserTable.area_id))
        .where(and(
            eq(this.areaUserTable.user_id, userId)
            , eq(this.areaTable.name, areaName)
        ));
        return result;
    }

    async getAreaForUser(userId: number){
        const result = await this.dbConn.select(getTableColumns(this.areaTable)).from(this.areaTable)
        .leftJoin(this.areaUserTable, eq(this.areaTable.area_id, this.areaUserTable.area_id))
        .where(eq(this.areaUserTable.user_id, userId));
        return result;
    }
}