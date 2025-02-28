export interface Permission {
    permissionId: number;
    name: string;
    description: string;
    type: string;
}

export interface PermissionGroup {
    title: string;
    key: string;
    children: { title: string; key: string; isLeaf: boolean, checked: boolean }[];
}