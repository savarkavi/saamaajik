"use client";

import UserCard from "@/components/UserCard";
import { useState } from "react";

const SearchUsers = ({ initialUsers }: any) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(initialUsers);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = initialUsers.filter((user: any) =>
      user.username.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  return (
    <div className="px-4 py-8 md:p-16">
      <div className="flex items-center gap-6 mb-16">
        <h1 className="text-white text-2xl font-semibold">Search</h1>
        <form>
          <input
            type="text"
            placeholder="type username"
            className="p-2 rounded-lg bg-stone-800 text-white"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </form>
      </div>
      <div className="flex flex-col gap-10">
        {filteredUsers.map((user: any) => {
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

export default SearchUsers;
