import { UserRole } from "@/types/enum";


type RouteConfig = {
  exact: string[];
  patterns: RegExp[];
};

const authRoutes: string[] = [
  "/login",
  "/forgot-password",
];

const commonProtectedRoutes: RouteConfig = {
  exact: [
    "/my-profile",
    "/settings",
    "/change-password",
  ],
  patterns: [],
};

const adminProtectedRoutes: RouteConfig = {
  exact: [],
  patterns: [/^\/admin(\/.*)?$/],
};

const registrarProtectedRoutes: RouteConfig = {
  exact: [],
  patterns: [/^\/registrar(\/.*)?$/],
};

const departmentHeadProtectedRoutes: RouteConfig = {
  exact: [],
  patterns: [/^\/department-head(\/.*)?$/],
};

const teacherProtectedRoutes: RouteConfig = {
  exact: [],
  patterns: [/^\/teacher(\/.*)?$/],
};

const accountantProtectedRoutes: RouteConfig = {
  exact: [],
  patterns: [/^\/accountant(\/.*)?$/],
};

const examControllerProtectedRoutes: RouteConfig = {
  exact: [],
  patterns: [/^\/exam-controller(\/.*)?$/],
};

const librarianProtectedRoutes: RouteConfig = {
  exact: [],
  patterns: [/^\/librarian(\/.*)?$/],
};

const studentProtectedRoutes: RouteConfig = {
  exact: [],
  patterns: [/^\/student(\/.*)?$/],
};

export const isAuthRoute = (
  pathname: string
): boolean => {
  return authRoutes.includes(pathname);
};

const isRouteMatches = (
  pathname: string,
  routes: RouteConfig
): boolean => {
  if (routes.exact.includes(pathname)) {
    return true;
  }

  return routes.patterns.some((pattern) =>
    pattern.test(pathname)
  );
};

export const getRouteOwner = (
  pathname: string
):
  | "PRINCIPAL"
  | "ADMIN"
  | "REGISTRAR"
  | "DEPARTMENT_HEAD"
  | "TEACHER"
  | "ACCOUNTANT"
  | "EXAM_CONTROLLER"
  | "LIBRARIAN"
  | "STUDENT"
  | "COMMON"
  | "PUBLIC" => {
  if (
    isRouteMatches(
      pathname,
      adminProtectedRoutes
    )
  )
    return "ADMIN";

  if (
    isRouteMatches(
      pathname,
      registrarProtectedRoutes
    )
  )
    return "REGISTRAR";

  if (
    isRouteMatches(
      pathname,
      departmentHeadProtectedRoutes
    )
  )
    return "DEPARTMENT_HEAD";

  if (
    isRouteMatches(
      pathname,
      teacherProtectedRoutes
    )
  )
    return "TEACHER";

  if (
    isRouteMatches(
      pathname,
      accountantProtectedRoutes
    )
  )
    return "ACCOUNTANT";

  if (
    isRouteMatches(
      pathname,
      examControllerProtectedRoutes
    )
  )
    return "EXAM_CONTROLLER";

  if (
    isRouteMatches(
      pathname,
      librarianProtectedRoutes
    )
  )
    return "LIBRARIAN";

  if (
    isRouteMatches(
      pathname,
      studentProtectedRoutes
    )
  )
    return "STUDENT";

  if (
    isRouteMatches(
      pathname,
      commonProtectedRoutes
    )
  )
    return "COMMON";

  return "PUBLIC";
};

export const getDefaultDashboard = (
  role: UserRole
): string => {
  switch (role) {
    case "PRINCIPAL":
      return "/admin/principal";
    case "ADMIN":
      return "/admin/dashboard";

    case "REGISTRAR":
      return "/registrar/dashboard";

    case "DEPARTMENT_HEAD":
      return "/department-head/dashboard";

    case "TEACHER":
      return "/teacher/dashboard";

    case "ACCOUNTANT":
      return "/accountant/dashboard";

    case "EXAM_CONTROLLER":
      return "/exam-controller/dashboard";

    case "LIBRARIAN":
      return "/librarian/dashboard";

    case "STUDENT":
      return "/student/dashboard";

    default:
      return "/login";
  }
};

export const canAccessRoute = (
  role: UserRole,
  routeOwner: ReturnType<
    typeof getRouteOwner
  >
): boolean => {
  switch (routeOwner) {
    case "COMMON":
      return true;

    case "ADMIN":
      return role === "ADMIN";

    case "REGISTRAR":
      return role === "REGISTRAR";

    case "DEPARTMENT_HEAD":
      return role === "DEPARTMENT_HEAD";

    case "TEACHER":
      return role === "TEACHER";

    case "ACCOUNTANT":
      return role === "ACCOUNTANT";

    case "EXAM_CONTROLLER":
      return role === "EXAM_CONTROLLER";

    case "LIBRARIAN":
      return role === "LIBRARIAN";

    case "STUDENT":
      return role === "STUDENT";

    default:
      return false;
  }
};