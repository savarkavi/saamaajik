import { fetchUser } from "@/lib/controllers/user";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Activity = async () => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.isBoarded) redirect("/onboarding");

  return (
    <div className="p-16">
      <h1 className="text-white text-2xl font-semibold">Activity</h1>
    </div>
  );
};

export default Activity;
