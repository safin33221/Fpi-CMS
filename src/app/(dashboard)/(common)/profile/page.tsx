import AboutCard from "@/components/module/common/profile/AboutCard";
import ProfileHero from "@/components/module/common/profile/ProfileHero";
import QuickStats from "@/components/module/common/profile/QuickStats";
import SecurityCard from "@/components/module/common/profile/SecurityCard";
import StudentCard from "@/components/module/common/profile/StudentCard";
import TeacherCard from "@/components/module/common/profile/TeacherCard";
import TimelineCard from "@/components/module/common/profile/TimelineCard";

import { myProfile } from "@/services/user/my-profile";
import { IUser } from "@/types/user";

export default async function ProfilePage() {
  const user: IUser = await myProfile();

  return (
    <div className="mx-auto  space-y-8 ">
      {/* Hero */}
      <ProfileHero user={user} />

      {/* Stats */}
      {/* <QuickStats user={user} /> */}

      {/* Content */}
      <div className="grid gap-8 xl:grid-cols-12">
        {/* Left Sidebar */}
        <aside className="space-y-8 xl:col-span-4">
          <AboutCard user={user} />
          <SecurityCard user={user} />
        </aside>

        {/* Main Content */}
        <main className="space-y-8 xl:col-span-8">
          {user.student && <StudentCard user={user} />}

          {user.teacher && <TeacherCard user={user} />}

          <TimelineCard user={user} />
        </main>
      </div>
    </div>
  );
}