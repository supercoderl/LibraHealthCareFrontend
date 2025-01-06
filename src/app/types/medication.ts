import { MedicationType } from "../enums";

export interface Medication {
    code: number;
    name: string;
    brand: string;
    description?: string | null;
    type: MedicationType;
    unit: string;
    price: number;
    stockQuantity: number;
    reorderLevel: number;
    supplierId: number;
    manifacturer: string;
    expireDate: Date;
    sideEffects?: string | null;
    usageInstructions?: string | null;
    isPrescriptionRequired: boolean;
}

