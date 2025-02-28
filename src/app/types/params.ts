import { ActionStatus } from "../enums";

export interface Params {
    pageIndex: number;
    pageSize: number;
    searchTerm?: string | null;
    status: ActionStatus;
}