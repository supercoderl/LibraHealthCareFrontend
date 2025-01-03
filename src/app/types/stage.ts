import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface Stage {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    icon: IconDefinition;
}