
export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <header>
                <h1>Navbar</h1>
            </header>
            <main>
                {children}
            </main>
            <footer>
                <h1>Footer</h1>
            </footer>
        </div>
    );
};
