import { AdminMenu } from "../types";

export const ADMIN_MENUS: AdminMenu[] = [
    {
        id: 1,
        title: 'Appointment',
        children: [
            {
                title: 'List',
                link: '/management/appointment/list',
                icon: 'audit'
            },
            {
                title: 'Schedule',
                link: "/management/schedule/calendar",
                icon: 'calendar'
            }
        ],
        part: 1
    },
    {
        id: 2,
        title: 'Block',
        children: [
            {
                title: 'List',
                link: '/management/block/list',
                icon: 'block'
            }
        ],
        part: 1
    },
    {
        id: 3,
        title: 'Physician',
        children: [
            {
                title: 'List',
                link: '/management/physician/list',
                icon: 'fork'
            }
        ],
        part: 1
    },
    {
        id: 4,
        title: 'Supplier',
        children: [
            {
                title: 'List',
                link: '/management/supplier/list',
                icon: 'gold'
            }
        ],
        part: 1
    },
    {
        id: 5,
        title: 'Department',
        children: [
            {
                title: 'List',
                link: '/management/department/list',
                icon: 'team'
            }
        ],
        part: 2
    },
    {
        id: 6,
        title: 'Medication',
        children: [
            {
                title: 'List',
                link: '/management/medication/list',
                icon: 'thunderbolt'
            }
        ],
        part: 2
    },
    {
        id: 7,
        title: 'Procedure',
        children: [
            {
                title: 'List',
                link: '/management/procedure/list',
                icon: 'share-alt'
            }
        ],
        part: 2
    },
    {
        id: 8,
        title: 'Treatment',
        children: [
            {
                title: 'List',
                link: '/management/treatment/list',
                icon: 'compass'
            }
        ],
        part: 2
    },
    {
        id: 9,
        title: 'Question',
        children: [
            {
                title: 'List',
                link: '/management/question/list',
                icon: 'question-circle'
            }
        ],
        part: 2
    },
    {
        id: 10,
        title: 'Nurse',
        children: [
            {
                title: 'List',
                link: '/management/nurse/list',
                icon: 'experiment'
            }
        ],
        part: 3
    },
    {
        id: 11,
        title: 'Patient',
        children: [
            {
                title: 'List',
                link: '/management/patient/list',
                icon: 'fire'
            }
        ],
        part: 3
    },
    {
        id: 12,
        title: 'Role',
        children: [
            {
                title: 'List',
                link: '/management/role/list',
                icon: 'holder'
            }
        ],
        part: 3
    },
    {
        id: 13,
        title: 'User',
        children: [
            {
                title: 'List',
                link: '/management/user/list',
                icon: 'user'
            }
        ],
        part: 3
    },
    {
        id: 14,
        title: 'Symtom',
        children: [
            {
                title: 'List',
                link: '/management/symtom/list',
                icon: 'bug'
            }
        ],
        part: 3
    },
    {
        id: 15,
        title: 'Disease',
        children: [
            {
                title: 'List',
                link: '/management/disease/list',
                icon: 'crown'
            },
            {
                title: 'Diagnoses',
                link: '/management/disease/diagnoses',
                icon: 'insert-row-below'
            }
        ],
        part: 1
    },
    {
        id: 16,
        title: 'Room',
        children: [
            {
                title: 'List',
                link: '/management/room/list',
                icon: 'gateway'
            },
        ],
        part: 2
    },
]