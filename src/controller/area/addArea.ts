import {RequestHandler} from 'express';
import { AreaTable } from '@database/table/area-table';
import { AreaUserTable, Roles } from '@database/table/area-user-table';
import { User } from '@type/general-types';
import { json } from 'body-parser';

export const addArea: RequestHandler = async(req, res) => {
    const userInfo = req.user as User;
    const requestBody = req.body as {area_name: string};
    const areaTable = new AreaTable();
    const searchResult = await areaTable.findAreaBasedOnUserIdAndAreaName(userInfo.user_id, requestBody.area_name);
    if (searchResult.length > 0) {
        res.status(409).send(JSON.stringify({success: false, error: "Area name already exists for the user"}));
    } else {
        const areaUserTable = new AreaUserTable();
        const result = await areaTable.insertAreaTodo(requestBody.area_name);
        await areaUserTable.insertAreaUser(userInfo.user_id, result[0].area_id, Roles.Admin);
        const areas = await areaTable.getAreaForUser(userInfo.user_id);
        res.send(JSON.stringify({success: true, data: areas})).status(200);
    }
}