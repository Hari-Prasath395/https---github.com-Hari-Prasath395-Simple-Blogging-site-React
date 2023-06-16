
import Post from "../../post/Post";
import { useFetch } from "../../hooks/useFetch";

export default function Home() {
  const {
    data: posts,
    error,
    isPending,
  } = useFetch("https://jsonplaceholder.typicode.com/posts");

  return (
    <div className="container row">
      {posts &&
        posts.map((post) => (
          <div key={post.id}>
            <Post post={post} />
          </div>
        ))}
      {error && <h3>{error}</h3>}
      {isPending && <h3>Loading...</h3>}
    </div>
  );
}
