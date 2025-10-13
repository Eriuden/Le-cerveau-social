import { useEffect, useState } from "react";
import { getPosts } from "../redux/actions/post.action";
import { useDispatch, useSelector } from "react-redux";
import { PostCard } from "./Post/PostCard";
import { isEmpty } from "./Utils";

export default function Thread() {
  const [loadPost, setLoadPost] = useState(true);
  const [count, setCount] = useState(5);
  const dispatch = useDispatch();
  const posts = useSelector((state:any) => state.postReducer);

  const loadMore = () => {
    
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >
      document.scrollingElement!.scrollHeight
    ) {
      setLoadPost(true);
    }
  };

  useEffect(() => {
    
    if (loadPost) {
      getPosts(count, dispatch);
      setLoadPost(false);
      setCount(count + 5);
    }

    window.addEventListener("scroll", loadMore);
    return () => window.removeEventListener("scroll", loadMore);
  }, [loadPost, dispatch, count]);

  return (
    <div className="thread-container">
      <ul>
        {!isEmpty(posts[0]) &&
          posts.map((post:any) => {
            return <PostCard
            _id={post._id}
            posterId={post.posterId}
            picture={post.picture}
            message={post.message}
            video={post.video}
            interesting={post.interesting}
            constructive={post.constructive}
            funny={post.funny}
            unpertinent={post.unpertinent}
            createdAt={posts.createdAt}
            comments={ post.comment} 
            key={post._id} />;
          })}
      </ul>
    </div>
  );
}
