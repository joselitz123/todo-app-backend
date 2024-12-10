import { RequestHandler } from "express";
import { LabelTable } from "@database/table/label-table";
import qs from 'qs'

type AreaIdQueryType = {
    area_id: string;
}

export const getLabel: RequestHandler = async (req, res) => {
    const query = req.query as AreaIdQueryType;
    console.log(typeof query.area_id);
    const labelTable = new LabelTable();
    const result = await labelTable.getLabelByArea(parseInt(query.area_id));
    res.status(200).send(JSON.stringify({success: true, data: result}));
}