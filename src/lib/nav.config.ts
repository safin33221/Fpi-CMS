

import { UserRole } from "@/types/enum";
import { getDefaultDashboard } from "./auth-utils";
import { NavSection } from "@/types/nav-menu";


const ALL_ROLES: UserRole[] = [
    UserRole.ADMIN,
    UserRole.REGISTRAR,
    UserRole.DEPARTMENT_HEAD,
    UserRole.TEACHER,
    UserRole.ACCOUNTANT,
    UserRole.EXAM_CONTROLLER,
    UserRole.LIBRARIAN,
    UserRole.STUDENT,
];

/* -------------------------------------------------------------------------- */
/*                               COMMON ITEMS                                 */
/* -------------------------------------------------------------------------- */

export const getTopNavItems = (
    role: UserRole
): NavSection[] => {
    const dashboard = getDefaultDashboard(role);

    return [
        {
            items: [
                {
                    title: "Dashboard",
                    href: dashboard,
                    icon: "LayoutDashboard",
                    roles: ALL_ROLES,
                },
                {
                    title: "Notices",
                    href: "/notices",
                    icon: "Bell",
                    roles: ALL_ROLES,
                },
            ],
        },
    ];
};

export const getBottomNavItems =
    (): NavSection[] => {
        return [
            {
                title: "Account",
                items: [
                    {
                        title: "Profile",
                        href: "/profile",
                        icon: "User",
                        roles: ALL_ROLES,
                    },
                    {
                        title: "Settings",
                        href: "/settings",
                        icon: "Settings",
                        roles: ALL_ROLES,
                    },
                    {
                        title: "Change Password",
                        href: "/change-password",
                        icon: "Lock",
                        roles: ALL_ROLES,
                    },
                ],
            },
        ];
    };

/* -------------------------------------------------------------------------- */
/*                                   ADMIN                                    */
/* -------------------------------------------------------------------------- */

export const adminNavItems: NavSection[] = [
    {
        title: "Administration",
        items: [
            {
                title: "Departments",
                href: "/admin/dashboard/departments",
                icon: "Building2",
                roles: [UserRole.ADMIN],
            },
            {
                title: "Staff",
                href: "/admin/dashboard/staff",
                icon: "Users",
                roles: [UserRole.ADMIN],
            },
            {
                title: "Analytics",
                href: "/admin/dashboard/analytics",
                icon: "BarChart3",
                roles: [UserRole.ADMIN],
            },
            {
                title: "Reports",
                href: "/admin/dashboard/reports",
                icon: "FileBarChart",
                roles: [UserRole.ADMIN],
            },
            {
                title: "System Settings",
                href: "/admin/dashboard/settings",
                icon: "ShieldCheck",
                roles: [UserRole.ADMIN],
            },
        ],
    },
];

/* -------------------------------------------------------------------------- */
/*                                 REGISTRAR                                  */
/* -------------------------------------------------------------------------- */

export const registrarNavItems: NavSection[] = [
    {
        title: "Student Affairs",
        items: [
            {
                title: "Admissions",
                href: "/registrar/admissions",
                icon: "UserPlus",
                roles: [UserRole.REGISTRAR],
            },
            {
                title: "Students",
                href: "/registrar/students",
                icon: "GraduationCap",
                roles: [UserRole.REGISTRAR],
            },
            {
                title: "Registrations",
                href: "/registrar/registrations",
                icon: "IdCard",
                roles: [UserRole.REGISTRAR],
            },
            {
                title: "Semester Promotion",
                href: "/registrar/promotions",
                icon: "ArrowUpCircle",
                roles: [UserRole.REGISTRAR],
            },
            {
                title: "Documents",
                href: "/registrar/documents",
                icon: "FileText",
                roles: [UserRole.REGISTRAR],
            },
        ],
    },
];

/* -------------------------------------------------------------------------- */
/*                              DEPARTMENT HEAD                               */
/* -------------------------------------------------------------------------- */

export const departmentHeadNavItems: NavSection[] = [
    {
        title: "Department",
        items: [
            {
                title: "Teachers",
                href: "/department-head/teachers",
                icon: "Users",
                roles: [UserRole.DEPARTMENT_HEAD],
            },
            {
                title: "Students",
                href: "/department-head/students",
                icon: "GraduationCap",
                roles: [UserRole.DEPARTMENT_HEAD],
            },
            {
                title: "Subjects",
                href: "/department-head/subjects",
                icon: "BookOpen",
                roles: [UserRole.DEPARTMENT_HEAD],
            },
            {
                title: "Routine",
                href: "/department-head/routine",
                icon: "CalendarDays",
                roles: [UserRole.DEPARTMENT_HEAD],
            },
            {
                title: "Attendance",
                href: "/department-head/attendance",
                icon: "ClipboardCheck",
                roles: [UserRole.DEPARTMENT_HEAD],
            },
        ],
    },
];

/* -------------------------------------------------------------------------- */
/*                                  TEACHER                                   */
/* -------------------------------------------------------------------------- */

export const teacherNavItems: NavSection[] = [
    {
        title: "Academic",
        items: [
            {
                title: "My Classes",
                href: "/teacher/classes",
                icon: "Presentation",
                roles: [UserRole.TEACHER],
            },
            {
                title: "Attendance",
                href: "/teacher/attendance",
                icon: "QrCode",
                roles: [UserRole.TEACHER],
            },
            {
                title: "Marks Entry",
                href: "/teacher/marks",
                icon: "PenSquare",
                roles: [UserRole.TEACHER],
            },
            {
                title: "Routine",
                href: "/teacher/routine",
                icon: "CalendarDays",
                roles: [UserRole.TEACHER],
            },
        ],
    },
];

/* -------------------------------------------------------------------------- */
/*                                ACCOUNTANT                                  */
/* -------------------------------------------------------------------------- */

export const accountantNavItems: NavSection[] = [
    {
        title: "Finance",
        items: [
            {
                title: "Fee Collection",
                href: "/accountant/collections",
                icon: "Wallet",
                roles: [UserRole.ACCOUNTANT],
            },
            {
                title: "Student Dues",
                href: "/accountant/dues",
                icon: "BadgeDollarSign",
                roles: [UserRole.ACCOUNTANT],
            },
            {
                title: "Transactions",
                href: "/accountant/transactions",
                icon: "Receipt",
                roles: [UserRole.ACCOUNTANT],
            },
            {
                title: "Reports",
                href: "/accountant/reports",
                icon: "FileBarChart",
                roles: [UserRole.ACCOUNTANT],
            },
        ],
    },
];

/* -------------------------------------------------------------------------- */
/*                             EXAM CONTROLLER                                */
/* -------------------------------------------------------------------------- */

export const examControllerNavItems: NavSection[] = [
    {
        title: "Examinations",
        items: [
            {
                title: "Exams",
                href: "/exam-controller/exams",
                icon: "FileSpreadsheet",
                roles: [UserRole.EXAM_CONTROLLER],
            },
            {
                title: "Results",
                href: "/exam-controller/results",
                icon: "Award",
                roles: [UserRole.EXAM_CONTROLLER],
            },
            {
                title: "Marksheets",
                href: "/exam-controller/marksheets",
                icon: "FileCheck",
                roles: [UserRole.EXAM_CONTROLLER],
            },
        ],
    },
];

/* -------------------------------------------------------------------------- */
/*                                LIBRARIAN                                   */
/* -------------------------------------------------------------------------- */

export const librarianNavItems: NavSection[] = [
    {
        title: "Library",
        items: [
            {
                title: "Books",
                href: "/librarian/books",
                icon: "BookOpen",
                roles: [UserRole.LIBRARIAN],
            },
            {
                title: "Issue Books",
                href: "/librarian/issues",
                icon: "BookMarked",
                roles: [UserRole.LIBRARIAN],
            },
            {
                title: "Returns",
                href: "/librarian/returns",
                icon: "Undo2",
                roles: [UserRole.LIBRARIAN],
            },
        ],
    },
];

/* -------------------------------------------------------------------------- */
/*                                  STUDENT                                   */
/* -------------------------------------------------------------------------- */

export const studentNavItems: NavSection[] = [
    {
        title: "Student Portal",
        items: [
            {
                title: "Attendance",
                href: "/student/attendance",
                icon: "ClipboardCheck",
                roles: [UserRole.STUDENT],
            },
            {
                title: "Routine",
                href: "/student/routine",
                icon: "CalendarDays",
                roles: [UserRole.STUDENT],
            },
            {
                title: "Subjects",
                href: "/student/subjects",
                icon: "BookOpen",
                roles: [UserRole.STUDENT],
            },
            {
                title: "Results",
                href: "/student/results",
                icon: "Award",
                roles: [UserRole.STUDENT],
            },
            {
                title: "Fees",
                href: "/student/fees",
                icon: "Wallet",
                roles: [UserRole.STUDENT],
            },
        ],
    },
];

/* -------------------------------------------------------------------------- */
/*                               FINAL MERGER                                 */
/* -------------------------------------------------------------------------- */

export const getNavItemsByRole = async (
    role: UserRole
): Promise<NavSection[]> => {
    const topItems = getTopNavItems(role);
    const bottomItems = getBottomNavItems();

    let roleItems: NavSection[] = [];

    switch (role) {
        case "ADMIN":
            roleItems = adminNavItems;
            break;

        case "REGISTRAR":
            roleItems = registrarNavItems;
            break;

        case "DEPARTMENT_HEAD":
            roleItems = departmentHeadNavItems;
            break;

        case "TEACHER":
            roleItems = teacherNavItems;
            break;

        case "ACCOUNTANT":
            roleItems = accountantNavItems;
            break;

        case "EXAM_CONTROLLER":
            roleItems = examControllerNavItems;
            break;

        case "LIBRARIAN":
            roleItems = librarianNavItems;
            break;

        case "STUDENT":
            roleItems = studentNavItems;
            break;

        default:
            roleItems = [];
    }

    return [
        ...topItems,
        ...roleItems,
        ...bottomItems,
    ];
};

