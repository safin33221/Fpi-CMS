import { getAllDepartment } from "@/services/department/getDepartment";

export default async function page() {
    const department = getAllDepartment()
    console.log(department);
    return (
        <div>
            <h1>Department Component</h1>
        </div>
    );
};
