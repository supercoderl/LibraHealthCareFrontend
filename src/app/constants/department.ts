import { faCapsules, faHospital, faStethoscope, faSyringe } from "@fortawesome/free-solid-svg-icons";
import { Department } from "../types/department";

export const DEPARTMENTS: Department[] = [
    {
        departmentId: 1,
        departmentName: 'Primary Care',
        subtitle: 'Diagnostics and prevention',
        icon: faStethoscope
    },
    {
        departmentId: 2,
        departmentName: 'Neurology',
        subtitle: 'Nervous system disorders',
        icon: faHospital
    },
    {
        departmentId: 3,
        departmentName: 'Pediatrics',
        subtitle: 'Premium care for children',
        icon: faCapsules
    },
    {
        departmentId: 4,
        departmentName: 'Cardiology',
        subtitle: 'Treating heart diseases',
        icon: faSyringe
    }
]