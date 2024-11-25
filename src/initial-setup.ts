import { StatusTable, Status } from '@database/table/status-table';

const predefinedStatus = [
    { name: 'backlog', actual_status: Status.NotStarted, color: '#3C414A', order: 1},
    { name: 'todo', actual_status: Status.NotStarted, color: '#3C414A', order: 2},
    { name: 'on hold', actual_status: Status.NotStarted, color: '#DC646A', order: 3},
    { name: 'in progress', actual_status: Status.Started, color: '#40A6E6', order: 4},
    { name: 'completed', actual_status: Status.Completed, color: '#33A069', order: 5},
]

export const initSetup = async () => {

    const statusTable = new StatusTable();
    const status = await statusTable.getStatus();

    predefinedStatus.forEach(async data => {
        const filterResult = status.filter(statuses => statuses.name === data.name);
        if (filterResult.length == 0) {
            await statusTable.insertStatus(data.name, data.color, data.actual_status, data.order);
        }
    });
}