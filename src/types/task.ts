import type { ColumnType } from "./column";

//creating and exporting Task type, to shape the task object which will be used in the app
export interface Task {
    id: string;
    title: string;
    description?: string | null;
    status: ColumnType
    createdAt: Date;
    updatedAt: Date;
    dueDate?: Date | null;
    priority: 'low' | 'medium' | 'high';
}
