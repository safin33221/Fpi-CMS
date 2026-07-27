import Hero from "@/components/module/public/home/Hero";
import { NoticeBoard } from "@/components/module/public/home/NoticeBoard";
import { PrincipalMessage } from "@/components/module/public/home/PrincipalMessage";

export default function Home() {
  return (
    <div>
      <Hero />
      <PrincipalMessage />
      <NoticeBoard />
    </div>
  );
};
