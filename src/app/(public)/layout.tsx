import NavbarWarper from "@/components/shared/NavbarWarper";




export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <div>


            <NavbarWarper />

            <main className="">
                {children}
            </main>
            <footer>
                <h1>Footer</h1>
            </footer>
        </div>
    );
};
