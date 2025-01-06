export interface Patient {
    ssn: number;
    name: string;
    address?: string | null;
    mobile: string;
    pcp?: string | null;
}