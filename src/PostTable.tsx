import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Post } from "./Post";

function PostTable() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage, setPostsPerPage] = useState<number>(5);
  const [selectedPost, setSelectedPost] = useState<Post>();

  const isPostSelected = useMemo(() => {
    if (selectedPost) {
      return true;
    }
    return false;
  }, [selectedPost]);

  useEffect(() => {
    axios
      .get<Post[]>("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="blog-posts">
      <table>
        {isPostSelected ? (
          <caption>Post Detail</caption>
        ) : (
          <caption>Blog Posts</caption>
        )}
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Body</th>
          </tr>
        </thead>
        <tbody>
          {selectedPost
            ? posts
                .filter((post) => post === selectedPost)
                .map((post) => (
                  <tr key={post.id}>
                    <td>{post.id}</td>
                    <td>{post.title}</td>
                    <td>{post.body}</td>
                  </tr>
                ))
            : posts
                .slice(
                  (currentPage - 1) * postsPerPage,
                  currentPage * postsPerPage
                )
                .map((post) => (
                  <tr key={post.id} onClick={() => setSelectedPost(post)}>
                    <td>{post.id}</td>
                    <td>{post.title}</td>
                    <td>{post.body}</td>
                  </tr>
                ))}
        </tbody>
      </table>

      <div className="blog-posts__actions">
        {isPostSelected ? (
          <div>
            <button onClick={() => setSelectedPost(undefined)}>Back</button>
          </div>
        ) : (
          <>
            {currentPage > 1 && (
              <button onClick={() => setCurrentPage(currentPage - 1)}>
                Prev
              </button>
            )}
            {currentPage}
            {currentPage < posts.length / postsPerPage && (
              <button onClick={() => setCurrentPage(currentPage + 1)}>
                Next
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default PostTable;
