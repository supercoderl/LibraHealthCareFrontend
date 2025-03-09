import { AdminMenu } from "../types";

export const ADMIN_MENUS: AdminMenu[] = [
    {
        id: 1,
        title: 'app.appointments',
        children: [
            {
                title: 'menu.list',
                link: '/management/appointment/list',
                icon: 'audit'
            },
            {
                title: 'menu.schedule',
                link: "/management/schedule/calendar",
                icon: 'calendar'
            }
        ],
        part: 1
    },
    {
        id: 2,
        title: 'app.blocks',
        children: [
            {
                title: 'menu.list',
                link: '/management/block/list',
                icon: 'block'
            }
        ],
        part: 1
    },
    {
        id: 3,
        title: 'app.physicians',
        children: [
            {
                title: 'menu.list',
                link: '/management/physician/list',
                icon: 'fork'
            },
            {
                title: 'app.affiliations',
                link: '/management/physician/affiliations',
                icon: 'link'
            },
            {
                title: 'app.trainings',
                link: '/management/physician/trainings',
                icon: 'key'
            },
            {
                title: 'app.experiences',
                link: '/management/physician/experiences',
                icon: 'medicine-box'
            }
        ],
        part: 1
    },
    {
        id: 4,
        title: 'app.suppliers',
        children: [
            {
                title: 'menu.list',
                link: '/management/supplier/list',
                icon: 'gold'
            }
        ],
        part: 1
    },
    {
        id: 5,
        title: 'app.departments',
        children: [
            {
                title: 'menu.list',
                link: '/management/department/list',
                icon: 'team'
            }
        ],
        part: 2
    },
    {
        id: 6,
        title: 'app.medications',
        children: [
            {
                title: 'menu.list',
                link: '/management/medication/list',
                icon: 'thunderbolt'
            },
            {
                title: 'app.prescriptions',
                link: '/management/medication/prescriptions',
                icon: 'exception'
            }
        ],
        part: 2
    },
    {
        id: 7,
        title: 'app.procedures',
        children: [
            {
                title: 'menu.list',
                link: '/management/procedure/list',
                icon: 'share-alt'
            }
        ],
        part: 2
    },
    {
        id: 8,
        title: 'app.treatments',
        children: [
            {
                title: 'menu.list',
                link: '/management/treatment/list',
                icon: 'compass'
            }
        ],
        part: 2
    },
    {
        id: 9,
        title: 'app.questions',
        children: [
            {
                title: 'menu.list',
                link: '/management/question/list',
                icon: 'question-circle'
            }
        ],
        part: 2
    },
    {
        id: 10,
        title: 'app.nurses',
        children: [
            {
                title: 'menu.list',
                link: '/management/nurse/list',
                icon: 'experiment'
            },
            {
                title: 'app.on-calls',
                link: '/management/nurse/onCalls',
                icon: 'phone'
            }
        ],
        part: 3
    },
    {
        id: 11,
        title: 'app.patients',
        children: [
            {
                title: 'menu.list',
                link: '/management/patient/list',
                icon: 'fire'
            },
            {
                title: 'app.medical-records',
                link: '/management/patient/medicalRecords',
                icon: 'reconciliation'
            }
        ],
        part: 3
    },
    {
        id: 12,
        title: 'app.roles',
        children: [
            {
                title: 'menu.list',
                link: '/management/role/list',
                icon: 'holder'
            },
            {
                title: 'app.permissions',
                link: '/management/role/permissions',
                icon: 'solution'
            }
        ],
        part: 3
    },
    {
        id: 13,
        title: 'app.users',
        children: [
            {
                title: 'menu.list',
                link: '/management/user/list',
                icon: 'user'
            }
        ],
        part: 3
    },
    {
        id: 14,
        title: 'app.symtoms',
        children: [
            {
                title: 'menu.list',
                link: '/management/symtom/list',
                icon: 'bug'
            }
        ],
        part: 3
    },
    {
        id: 15,
        title: 'app.diseases',
        children: [
            {
                title: 'menu.list',
                link: '/management/disease/list',
                icon: 'crown'
            },
            {
                title: 'app.diagnoses',
                link: '/management/disease/diagnoses',
                icon: 'insert-row-below'
            }
        ],
        part: 1
    },
    {
        id: 16,
        title: 'app.rooms',
        children: [
            {
                title: 'menu.list',
                link: '/management/room/list',
                icon: 'gateway'
            },
            {
                title: 'app.stays',
                link: '/management/room/stays',
                icon: 'customer-service'
            },
        ],
        part: 2
    },
]