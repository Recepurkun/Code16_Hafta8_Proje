import React from "react";
import { useSelector } from "react-redux";
import { selectAllPosts } from "./postsSlice";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButton from "./ReactionButton";

function PostsList() {
  const posts = useSelector(selectAllPosts);
  {
    /*TODO: Sonradan eklenen postlari localStorage da sakla ve ona göre listele */
  }

  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  const renderedPosts = orderedPosts.map((post) => (
    <article key={post.id}>
      <h3>{post.title}</h3>
      {/* <p>{post.content.substring(0, 100)}</p> */}
      <p>{post.content}</p>

      <div className="postCredit">
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </div>
      <ReactionButton post={post} />
    </article>
  ));

  return (
    <section>
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  );
}

export default PostsList;
