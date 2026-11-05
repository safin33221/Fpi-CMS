import { UserRole } from "@/types/enum";
import { getDefaultDashboard } from "./auth-utils";
import { NavSection } from "@/types/nav-menu";

const ALL_ROLES: UserRole[] = [
    UserRole.PRINCIPAL,
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

export const getBottomNavItems = (): NavSection[] => {
    return [
        {
            title: "Settings & Account",
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
/*                              ADMIN / PRINCIPAL                             */
/* -------------------------------------------------------------------------- */

export const adminNavItems: NavSection[] = [
    {
        title: "Academic & Campus",
        items: [
            {
                title: "Departments",
                href: "/admin/dashboard/departments",
                icon: "Building2",
                roles: [UserRole.ADMIN, UserRole.PRINCIPAL],
            },
            {
                title: "Subjects",
                href: "/admin/dashboard/subjects",
                icon: "BookOpen",
                roles: [UserRole.ADMIN, UserRole.PRINCIPAL],
            },
            {
                title: "Academic Sessions",
                href: "/admin/dashboard/academic-sessions",
                icon: "CalendarRange",
                roles: [UserRole.ADMIN, UserRole.PRINCIPAL],
            },
            {
                title: "Rooms & Labs",
                href: "/admin/dashboard/rooms",
                icon: "DoorOpen",
                roles: [UserRole.ADMIN, UserRole.PRINCIPAL],
            },
        ],
    },
    {
        title: "Human Resources",
        items: [
            {
                title: "Employees & Staff",
                href: "/admin/dashboard/staff",
                icon: "Users",
                roles: [UserRole.ADMIN, UserRole.PRINCIPAL],
            },
        ],
    },
    {
        title: "Analytics & System",
        items: [
            {
                title: "Analytics",
                href: "/admin/dashboard/analytics",
                icon: "BarChart3",
                roles: [UserRole.ADMIN, UserRole.PRINCIPAL],
            },
            {
                title: "Reports",
                href: "/admin/dashboard/reports",
                icon: "FileBarChart",
                roles: [UserRole.ADMIN, UserRole.PRINCIPAL],
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
        title: "Student Admissions",
        items: [
            {
                title: "Admissions",
                href: "/registrar/dashboard/admissions",
                icon: "UserPlus",
                roles: [UserRole.REGISTRAR],
            },
            {
                title: "Students",
                href: "/registrar/dashboard/students",
                icon: "GraduationCap",
                roles: [UserRole.REGISTRAR],
            },
            {
                title: "Import Students",
                href: "/registrar/dashboard/students/import",
                icon: "Upload",
                roles: [UserRole.REGISTRAR],
            },
        ],
    },
    {
        title: "Academic Records",
        items: [
            {
                title: "Registrations",
                href: "/registrar/dashboard/registrations",
                icon: "IdCard",
                roles: [UserRole.REGISTRAR],
            },
            {
                title: "Semester Promotion",
                href: "/registrar/dashboard/promotions",
                icon: "ArrowUpCircle",
                roles: [UserRole.REGISTRAR],
            },
            {
                title: "Documents",
                href: "/registrar/dashboard/documents",
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
        title: "Faculty & Students",
        items: [
            {
                title: "Teachers",
                href: "/department-head/dashboard/teachers",
                icon: "Users",
                roles: [UserRole.DEPARTMENT_HEAD],
            },
            {
                title: "Students",
                href: "/department-head/dashboard/students",
                icon: "GraduationCap",
                roles: [UserRole.DEPARTMENT_HEAD],
            },
        ],
    },
    {
        title: "Curriculum & Routine",
        items: [
            {
                title: "Subjects",
                href: "/department-head/dashboard/subjects",
                icon: "BookOpen",
                roles: [UserRole.DEPARTMENT_HEAD],
            },
            {
                title: "Curriculum",
                href: "/department-head/dashboard/curriculum",
                icon: "FileSpreadsheet",
                roles: [UserRole.DEPARTMENT_HEAD],
            },
            {
                title: "Class Routine",
                href: "/department-head/dashboard/routine",
                icon: "CalendarDays",
                roles: [UserRole.DEPARTMENT_HEAD],
            },
            {
                title: "Attendance",
                href: "/department-head/dashboard/attendance",
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
        title: "Classes & Schedule",
        items: [
            {
                title: "My Classes",
                href: "/teacher/dashboard/classes",
                icon: "Presentation",
                roles: [UserRole.TEACHER],
            },
            {
                title: "Routine",
                href: "/teacher/dashboard/routine",
                icon: "CalendarDays",
                roles: [UserRole.TEACHER],
            },
        ],
    },
    {
        title: "Classroom Activities",
        items: [
            {
                title: "Attendance",
                href: "/teacher/dashboard/attendance",
                icon: "QrCode",
                roles: [UserRole.TEACHER],
            },
            {
                title: "Marks Entry",
                href: "/teacher/dashboard/marks",
                icon: "PenSquare",
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
        title: "Fee Collections",
        items: [
            {
                title: "Fee Collection",
                href: "/accountant/dashboard/collections",
                icon: "Wallet",
                roles: [UserRole.ACCOUNTANT],
            },
            {
                title: "Student Dues",
                href: "/accountant/dashboard/dues",
                icon: "BadgeDollarSign",
                roles: [UserRole.ACCOUNTANT],
            },
        ],
    },
    {
        title: "Accounts & Reports",
        items: [
            {
                title: "Transactions",
                href: "/accountant/dashboard/transactions",
                icon: "Receipt",
                roles: [UserRole.ACCOUNTANT],
            },
            {
                title: "Reports",
                href: "/accountant/dashboard/reports",
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
        title: "Academic Portal",
        items: [
            {
                title: "Routine",
                href: "/student/dashboard/routine",
                icon: "CalendarDays",
                roles: [UserRole.STUDENT],
            },
            {
                title: "Attendance",
                href: "/student/dashboard/attendance",
                icon: "ClipboardCheck",
                roles: [UserRole.STUDENT],
            },
            {
                title: "Subjects",
                href: "/student/dashboard/subjects",
                icon: "BookOpen",
                roles: [UserRole.STUDENT],
            },
        ],
    },
    {
        title: "Records & Finance",
        items: [
            {
                title: "Results",
                href: "/student/dashboard/results",
                icon: "Award",
                roles: [UserRole.STUDENT],
            },
            {
                title: "Fees",
                href: "/student/dashboard/fees",
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
        case "PRINCIPAL":
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
