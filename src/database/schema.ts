import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const userTable = sqliteTable('user', {
    user_id: integer().primaryKey({autoIncrement: true}),
    username: text(),
    name: text(),
    email: text().unique()
});

export const areaTable = sqliteTable('area', {
    area_id: integer().primaryKey({autoIncrement: true}),
    name: text(),
    icon: text(),
    created_at: text().default(sql`(CURRENT_TIMESTAMP)`)
});

export const areaUserTable = sqliteTable('area_user', {
    area_user_id: integer().primaryKey({autoIncrement: true}),
    user_id: integer().references(() => userTable.user_id),
    area_id: integer().references(() => areaTable.area_id),
    role: text({enum: ['admin', 'edit', 'read']})
});

export const labelTable = sqliteTable('label', {
    label_id: integer().primaryKey({autoIncrement: true}),
    area_id: integer().references(() => areaTable.area_id),
    name: text()
});


export const assignedTodoTable = sqliteTable('assigned_todo', {
    assigned_todo_id: integer().primaryKey({autoIncrement: true}),
    todo_id: integer().references(() => todoTable.todo_id),
    user_id: integer().references(() => userTable.user_id),
    created_at: text().default(sql`(CURRENT_TIMESTAMP)`)
});


export const todoTable = sqliteTable('todo', {
    todo_id: integer().primaryKey({autoIncrement: true}),
    name: text(),
    label: text(),
    due_date: integer({mode: 'timestamp'}),
    priority: text({enum: ["critical", "high", "medium", "low"]}),
    status: integer().references(() => statusTable.status_id),
    created_at: text().default(sql`(CURRENT_TIMESTAMP)`),
    updated_at: integer({mode: 'timestamp'}).default(sql`(CURRENT_TIMESTAMP)`)
});

export const contentTable = sqliteTable('content', {
    content_id: integer().primaryKey({autoIncrement: true}),
    todo_id: integer().references(() => todoTable.todo_id),
    content: text()
});

export const todoRelationshipTable = sqliteTable('todo_relationship', {
    todo_relationship_id: integer().primaryKey({autoIncrement: true}),
    area_id: integer().references(() => areaTable.area_id),
    todo_parent: integer(),
    todo_child: integer(),
    depth: integer(),
});


export const repeatedTodoTable = sqliteTable('repated_todo', {
    repeated_todo_id: integer().primaryKey({autoIncrement: true}),
    cron_job: text(),
    denormalized_result: text()
});

export const statusTable = sqliteTable('status', {
    status_id: integer().primaryKey({autoIncrement: true}),
    name: text(),
    status_color: text(),
    actual_status: text({enum: ["not_started", "started", "completed"]}),
    order: integer()
});