import { faCapsules, faHospital, faStethoscope, faSyringe } from "@fortawesome/free-solid-svg-icons";
import { Department } from "../types/department";

export const DEPARTMENTS: Department[] = [
    {
        id: 1,
        title: 'Primary Care',
        subtitle: 'Diagnostics and prevention',
        icon: faStethoscope
    },
    {
        id: 2,
        title: 'Neurology',
        subtitle: 'Nervous system disorders',
        icon: faHospital
    },
    {
        id: 3,
        title: 'Pediatrics',
        subtitle: 'Premium care for children',
        icon: faCapsules
    },
    {
        id: 4,
        title: 'Cardiology',
        subtitle: 'Treating heart diseases',
        icon: faSyringe
    }
]