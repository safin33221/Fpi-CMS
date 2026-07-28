import { Footer } from "@/components/common/Footer";
import NavbarWarper from "@/components/shared/NavbarWarper";




export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <div>


            <NavbarWarper />

            <main className="">
                {children}
            </main>
            <Footer />
        </div>
    );
};
