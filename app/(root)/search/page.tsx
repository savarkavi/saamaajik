import UserCard from "@/components/UserCard";
import { fetchUser, fetchUsers } from "@/lib/controllers/user";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Search = async () => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.isBoarded) redirect("/onboarding");

  const res = await fetchUsers();

  return (
    <div className="p-16">
      <h1 className="text-white text-2xl font-semibold mb-16">Search</h1>
      <div className="flex flex-col gap-10">
        {res.map((user) => {
          return (
            <UserCard
              key={user._id}
              image={user.image}
              name={user.name}
              username={user.username}
              userId={user.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Search;
