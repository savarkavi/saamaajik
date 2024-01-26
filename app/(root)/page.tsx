import { fetchPosts } from "@/lib/controllers/post";

import PostCard from "@/components/PostCard";

export default async function Home() {
  const res = await fetchPosts({ page: 1, pageSize: 20 });

  return (
    <div className="p-16">
      <h1 className="text-2xl font-semibold mb-8 text-white">Home</h1>
      <div>
        {res.length === 0 ? (
          <div>No Posts found</div>
        ) : (
          <div className="flex flex-col gap-10">
            {res.map((post) => {
              return (
                <PostCard
                  key={post._id}
                  image={post.author.image}
                  username={post.author.username}
                  text={post.text}
                  postId={post._id}
                  userId={post.author.id}
                  isComment={false}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
