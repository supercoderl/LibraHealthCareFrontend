export interface MenuItem {
    id: number,
    title: string,
    path: string | null,
    children?: MenuItem[] | null
}