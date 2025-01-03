export interface Post {
    id: number;
    title: string;
    description?: string | null;
    img: string;
    date: string;
    author?: string | null;
    comments?: string[] | null;
}