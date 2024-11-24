import {RequestHandler} from 'express';
import { AreaTable } from '@database/table/area-table';
import { User } from '@type/general-types';

export const getArea: RequestHandler = async(req, res) => {
    const reqBody = req.user as User;
    const areaTable = new AreaTable;
    const result = await areaTable.getAreaForUser(reqBody.user_id);
    res.status(200).send(JSON.stringify({success: true, data: result}));
}