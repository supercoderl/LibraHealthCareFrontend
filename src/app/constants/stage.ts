import { faCircleCheck, faRectangleList, faRegistered } from "@fortawesome/free-regular-svg-icons";
import { faWaveSquare } from "@fortawesome/free-solid-svg-icons";
import { Stage } from "../types";

export const STAGES: Stage[] = [
    {
        id: 1,
        title: 'Register',
        subtitle: 'First step of process',
        description: 'You need create an account to use this function.',
        icon: faRegistered
    },
    {
        id: 2,
        title: 'Fill form',
        subtitle: 'Our second easy',
        description: 'Choose the symtomps which you feel.',
        icon: faRectangleList
    },
    {
        id: 3,
        title: 'Diagnosis',
        subtitle: 'Important third step',
        description: 'Waiting for the AI to diagnose your health.',
        icon: faWaveSquare
    },
    {
        id: 4,
        title: 'Confirmation',
        subtitle: 'Solution in final step',
        description: 'Send your result to physicians and have them check it.',
        icon: faCircleCheck
    }
]