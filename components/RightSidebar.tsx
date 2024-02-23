import { fetchUsers } from "@/lib/controllers/user";
import NewUserCard from "./NewUserCard";

const RightSidebar = async () => {
  const res = await fetchUsers();
  const usersArray = res.slice(4);

  return (
    <div className="bg-[#111111] sticky right-0 top-[80px] w-[350px] h-[calc(100vh-80px)] px-8 py-4 hidden 2xl:block">
      <h2 className="text-white text-3xl my-8">New Users:</h2>
      <div className="flex flex-col gap-12">
        {usersArray.map((user) => {
          return (
            <NewUserCard
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

export default RightSidebar;
