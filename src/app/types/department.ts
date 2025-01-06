import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface Department {
    departmentId: number;
    departmentName: string;
    subtitle?: string | null;
    icon?: IconDefinition | null;
}