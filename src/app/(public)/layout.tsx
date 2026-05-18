import NavbarWarper from "@/components/shared/NavbarWarper";

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <header>
                <NavbarWarper />
            </header>
            <main className="mt-32">
                {children}
            </main>
            <footer>
                <h1>Footer</h1>
            </footer>
        </div>
    );
};
