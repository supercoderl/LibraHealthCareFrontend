import { Plan } from "../types";

export const PLANS: Plan[] = [
    {
        id: 1,
        title: 'app.free',
        price: 0,
        discount: null,
        limits: {
            patientProfiles: "100",
            medicalConsulations: "10",
            dataStorage: "2 GB"
        },
        features: ["app.home.appointment-scheduler", "app.home.basic-analytics"]
    },
    {
        id: 2,
        title: 'app.essentials',
        price: 50,
        discount: null,
        limits: {
            patientProfiles: "500",
            medicalConsulations: "20",
            dataStorage: "20 GB"
        },
        features: ["app.home.appointment-scheduler", "app.home.advanced-analytics", "app.home.priority-email-support"]
    },
    {
        id: 3,
        title: 'app.team',
        price: 90,
        discount: 30,
        limits: {
            patientProfiles: "1000",
            medicalConsulations: "50",
            dataStorage: "50 GB"
        },
        features: ["app.home.appointment-scheduler", "app.home.advanced-analytics", "app.home.24-7-chat-support"]
    },
    {
        id: 4,
        title: "app.enterprise",
        price: 150,
        discount: null,
        limits: {
            patientProfiles: "app.unlimited",
            medicalConsulations: "app.unlimited",
            dataStorage: "100 GB"
        },
        features: ["app.home.appointment-scheduler", "app.home.advanced-analytics", "app.home.dedicated-account-manager"]
    }
]