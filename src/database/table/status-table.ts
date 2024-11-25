import { Database } from "../database";
import { eq } from "drizzle-orm";
import { statusTable } from "../schema";
import { catchError } from "@decorator/catch-error";

export enum Status{
    NotStarted = "not_started",
    Started = "started",
    Completed = "completed"
}

export class StatusTable{
    private dbConn;
    private statusTable;

    constructor(){
        this.dbConn = Database.getInstance().getConnection();
        this.statusTable = statusTable;
    }

    @catchError
    async insertStatus(statusName: string, statusColor: string, actualStatus: Status, order: number){
        await this.dbConn.insert(this.statusTable).values({name: statusName, status_color: statusColor, actual_status: actualStatus, order});
    }
    
    @catchError
    async getStatus(){
        const status = await this.dbConn.select().from(this.statusTable);
        return status;
    }
}