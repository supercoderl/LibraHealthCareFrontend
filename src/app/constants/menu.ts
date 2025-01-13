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
        id: 10,
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
        id: 11,
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
        id: 12,
        title: 'User',
        children: [
            {
                title: 'List',
                link: '/management/user/list',
                icon: 'user'
            }
        ],
        part: 3
    }
]