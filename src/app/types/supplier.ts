export interface Supplier {
    supplierId: number;
    name: string;
    contactNumber: string;
    email: string;
    address?: string | null;
    taxIdNumber?: string | null;
    website?: string | null;
    createdDate: Date;
    updatedDate?: Date | null;
}