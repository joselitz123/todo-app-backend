import { Database } from "../database";
import { eq } from "drizzle-orm";
import { labelTable } from "../schema";
import { catchError } from "@decorator/catch-error";

export class LabelTable{
    private dbConn;
    private labelTable;

    constructor(){
        this.dbConn = Database.getInstance().getConnection();
        this.labelTable = labelTable;
    }

    @catchError
    async insert(areaId: number, name: string, color: string){
        await this.dbConn.insert(this.labelTable).values({area_id: areaId,name, color});
    }

    @catchError
    async getLabelByArea(areaId: number){
        const result = await this.dbConn.select().from(this.labelTable).where(eq(this.labelTable.area_id, areaId));
        return result;
    }

    @catchError
    async insertAndGetAreaById(areaId: number, name: string, color: string){
        await this.insert(areaId, name, color);
        const result = await this.getLabelByArea(areaId);
        return result;
    }

}