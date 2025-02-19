import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addComment, getPosts } from "../../redux/actions/post.action"
import FollowHandler from "../Profile/FollowHandler"
import { isEmpty, timeStampParser } from "../Utils";
import { EditDeleteComment } from "./EditDeleteComment";

export const CardComment = ( post:any) => {
  
  type appDispatch = () => any

  const [text, setText] = useState("");
  const usersData = useSelector((state:any) => state.usersReducer);
  const userData = useSelector((state:any) => state.userReducer);
  const useAppDispatch = () => useDispatch<appDispatch>()
  const dispatch = useAppDispatch()

  const handleComment = (e:any) => {
    e.prevenDefault();

    if (text) {
      addComment(post._id, userData, dispatch)
        .then(() => getPosts(post, dispatch))
        .then(() => setText(""));
    }
  };
  return (
    <div className="comments-container">
      {post.comments.map((comment:any) => {
        return (
          <div
            className={
              comment.commenterId === userData._id
                ? "comment-container client"
                : "comment-container"
            }
            key={comment._id}
          >
            <div className="left-part">
              <img
                src={
                  !isEmpty(usersData[0]) &&
                  usersData
                    .map((user:any) => {
                      if (user._id === comment.commenterId) return user.picture;
                      else return null;
                    })
                    .join("")
                }
                alt="commenter-pic"
              />
            </div>
            <div className="right-part">
              <div className="comment-header">
                <div className="pseudo">
                  <h3>{comment.commenterPseudo}</h3>
                  {comment.commenterId !== userData._id && (
                    <FollowHandler idToFollow={comment.commenterId} />
                  )}
                </div>
                <span>{timeStampParser(comment.timeStamp)}</span>
              </div>
              <p>{comment.text}</p>
              <EditDeleteComment props={comment} postId={post._id} />
            </div>
          </div>
        );
      })}
      {
        
        userData._id && (
          <form action="" onSubmit={handleComment} className="comment-form">
            <input
              type="text"
              name="text"
              onChange={(e) => setText(e.target.value)}
              value={text}
              placeholder="laisser un commentaire"
            />
            <br />
            <input type="submit" value="Envoyer" />
          </form>
        )
      }
    </div>
  );
}