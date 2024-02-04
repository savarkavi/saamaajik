import OnboardingForm from "@/components/OnboardingForm";
import { fetchUser } from "@/lib/controllers/user";
import { currentUser } from "@clerk/nextjs";

async function Onboarding() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  const userData = {
    id: user?.id,
    name: userInfo ? userInfo?.name : user?.firstName,
    username: userInfo ? userInfo?.username : user?.username,
    image: userInfo ? userInfo?.image : user?.imageUrl,
    bio: userInfo ? userInfo?.bio : "",
  };

  return (
    <div className="bg-black h-screen flex justify-center items-center">
      <div className="flex flex-col gap-6 w-full max-w-[500px] mx-auto">
        <div className="flex flex-col gap-3 text-white">
          <h1 className="text-4xl font-semibold">Profile</h1>
          <p>Update your profile info.</p>
        </div>
        <OnboardingForm user={userData} />
      </div>
    </div>
  );
}

export default Onboarding;
