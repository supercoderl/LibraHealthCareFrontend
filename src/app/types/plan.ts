export interface Plan {
    id: number;
    title: string;
    price: number;
    discount: number | null;
    limits: Limit;
    features: string[]
}

interface Limit {
    patientProfiles: string;
    medicalConsulations: string;
    dataStorage: string;
}