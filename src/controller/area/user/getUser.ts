import {RequestHandler} from 'express';
import { UserTable } from '@database/table/user-table';
import { AreaUserTable, Roles } from '@database/table/area-user-table';
import { User } from '@type/general-types';

type AreaIdQueryType = {
    area_id: string;
}

export const getAreaUser: RequestHandler = async(req, res) => {
    const query = req.query as AreaIdQueryType;
    const userTable = new UserTable();
    const result = await userTable.getUsersByAreaId(parseInt(query.area_id));
    console.log(result);
    res.status(200).send(JSON.stringify({success: true, data: result}));
}