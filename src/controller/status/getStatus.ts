import {RequestHandler} from 'express';
import { StatusTable } from '@database/table/status-table';
import { User } from '@type/general-types';

export const getStatus: RequestHandler = async(req, res) => {

    const statusTable = new StatusTable;
    const result = await statusTable.getStatus();
    res.status(200).send(JSON.stringify({success: true, data: result}));
}