import { RequestHandler } from "express";
import { LabelTable } from "@database/table/label-table";


export const postLabel: RequestHandler = async (req, res) => {
    const labelTable = new LabelTable;
    const rb = req.body as {area_id: string, label_name: string, label_color: string};
    console.log(rb);
    const result = await labelTable.insertAndGetAreaById(parseInt(rb.area_id), rb.label_name, rb.label_color);
    res.status(200).send(JSON.stringify({success: true, data: result}));
}