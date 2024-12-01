import { RequestHandler } from "express";
import { LabelTable } from "@database/table/label-table";

type GetLabelParams = {
    area_id: number
}

export const getLabel: RequestHandler = (req, res) => {
    const params = req.params;
    const labelTable = new LabelTable();
    // labelTable.getLabelByArea();
}