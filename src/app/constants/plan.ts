import { Plan } from "../types";

export const PLANS: Plan[] = [
    {
        id: 1,
        title: 'Free',
        price: 0,
        discount: null,
        limits: {
            patientProfiles: "100",
            medicalConsulations: "10",
            dataStorage: "2 GB"
        },
        features: ["Appointment Scheduler", "Basic Analytics"]
    },
    {
        id: 2,
        title: 'Essentials',
        price: 50,
        discount: null,
        limits: {
            patientProfiles: "500",
            medicalConsulations: "20",
            dataStorage: "20 GB"
        },
        features: ["Appointment Scheduler", "Advanced Analytics", "Priority Email Support"]
    },
    {
        id: 3,
        title: 'Team',
        price: 90,
        discount: 30,
        limits: {
            patientProfiles: "1000",
            medicalConsulations: "50",
            dataStorage: "50 GB"
        },
        features: ["Appointment Scheduler", "Advanced Analytics", "24/7 Chat Support"]
    },
    {
        id: 4,
        title: "Enterprise",
        price: 150,
        discount: null,
        limits: {
            patientProfiles: "Unlimited",
            medicalConsulations: "Unlimited",
            dataStorage: "100 GB"
        },
        features: ["Appointment Scheduler", "Advanced Analytics", "Dedicated Account Manager"]
    }
]