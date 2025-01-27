
import {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrends } from "../redux/actions/post.action";
import { isEmpty } from "./Utils";
import { Link } from "react-router-dom";

export default function Trends() {
  const posts = useSelector((state:any) => state.allPostReducer);
  const usersData = useSelector((state:any) => state.usersReducer);
  const trendList = useSelector((state:any) => state.trendingReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isEmpty(posts[0])) {
      const postsArr = Object.keys(posts).map((i) => posts[i]);
      
      let sortedArray = postsArr.sort((a, b) => {
        return b.likers.length - a.likers.length;
      });
      sortedArray.length = 3;
      console.log(sortedArray);
      dispatch(getTrends(sortedArray));
    }
  }, [posts, dispatch]);
  return (
    <div className="trending-container">
      <h4>Tendances</h4>
      <Link to={"/trending"}>
        <ul>
          {
            
            trendList.length &&
              trendList.map((post:any) => {
                return (
                  <li key={post._id}>
                    <div>
                      {post.picture && (
                        <img src={post.picture} alt="post-pic" />
                      )}
                      {post.video && (
                        <iframe
                          src={post.video}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media;gyroscope: picture-in-picture"
                          allowFullScreen
                          title={post._id}
                        ></iframe>
                      )}
                      {isEmpty(post.picture) && isEmpty(post.video) && (
                        <img
                          src={
                            usersData[0] &&
                            usersData
                              .map((user:any) => {
                                if (user._id === post.posterId) {
                                  return user.picture;
                                } else return null;
                              })
                              .join("")
                          }
                          alt="photoProfil"
                        />
                      )}
                    </div>
                    <div className="trend-content">
                      <p>{post.message}</p>
                      <span>Lire</span>
                    </div>
                  </li>
                );
              })
          }
        </ul>
      </Link>
    </div>
  );
}
