import SearchUsers from "@/components/SearchUsers";
import { fetchUser, fetchUsers } from "@/lib/controllers/user";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Search = async () => {
  const user = await currentUser();
  const initialUsers = await fetchUsers();

  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.isBoarded) redirect("/onboarding");

  return <SearchUsers initialUsers={initialUsers} />;
};

export default Search;
