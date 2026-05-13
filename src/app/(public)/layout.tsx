import Navbar from "@/components/shared/Navbar";

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <header>
                <Navbar />
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
