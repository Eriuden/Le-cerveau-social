import  { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../../redux/actions/post.action"
import FollowHandler from "../Profile/FollowHandler"
import { IntButton } from "./ReactionsButton/IntButton";
import { ConstrucButton } from "./ReactionsButton/ConstrucButton";
import { FunnyButton } from "./ReactionsButton/FunnyButton";
import { UnpertButton } from "./ReactionsButton/UnpertButton";
import DeletePostCard from "./DeletePostCard";
import {CardComment} from "../Post/CommentCard"
import { dateParser, isEmpty } from "../Utils";

type postPropsType = {
  _id: string,
  posterId: string,
  picture: string,
  message: string,
  video: string,
  interesting: [string],
  constructive: [string],
  funny: [string],
  unpertinent: [string],
  createdAt: Date,
  comments: [{
    _id: string,
    postId: string,
    commenterId: string,
    text: string
  }]
}

export const PostCard = ( postProps: postPropsType ) => {
  const usersData = useSelector((state:any) => state.usersReducer);
  const userData = useSelector((state:any) => state.userReducer);
  const dispatch = useDispatch();
  
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);
  const [showComments, setShowComments] = useState(false);
  

  const updateItem = () => {
    if (textUpdate) {
      updatePost(postProps._id, textUpdate, dispatch);
    }
    setIsUpdated(false);
  };

  useEffect(() => {
    !isEmpty(usersData[0]) && setIsLoading(false);
  }, [usersData]);

  return (
    <li className="card-container" key={postProps._id}>
      {isLoading ? (
        <i className="fas-fa-spinner fa-spin"></i>
      ) : (
        <>
          <div className="card-left">
            <img
              src={
                !isEmpty(usersData[0]) &&
                usersData
                  .map((user:any) => {
                    if (user._id === postProps.posterId) return user.picture;
                    else return null;
                  })
                  .join("")
              }
              alt="poster-pic"
            />
          </div>
          <div className="card-right">
            <div className="card-header">
              <div className="name">
                <h3>
                  {!isEmpty(usersData[0]) &&
                    usersData
                      .map((user:any) => {
                        if (user._id === postProps.posterId) return user.name;
                        else return null;
                      })
                      .join("")}
                </h3>
                {postProps.posterId !== userData._id && (
                  <FollowHandler idToFollow={postProps.posterId} idToUnfollow={postProps.posterId} type={"card"} />
                )}
              </div>
              <span>{dateParser(postProps.createdAt)}</span>
            </div>
            {isUpdated === false && <p>{postProps.message}</p>}
            {isUpdated && (
              <div className="update-post">
                <textarea
                  defaultValue={postProps.message}
                  onChange={(e:any) => setTextUpdate(e.target.value)}
                />
                <div className="button-container">
                  <button className="btn" onClick={updateItem}>
                    Valider les modifications
                  </button>
                </div>
              </div>
            )}
            {postProps.picture && (
              <img src="{post.pivture" alt="card-pic" className="card-pic" />
            )}

            <p>{postProps.message}</p>
            {
              postProps.picture && (
                <img src={postProps.picture} alt="card-pic" className='"card-pic' />
              )
            }
            {postProps.video && (
              <iframe
                width="500"
                height="300"
                src={postProps.video}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media;
                        gyroscope: picture-in-picture"
                allowFullScreen
                title={postProps._id}
              ></iframe>
            )}
            {
              userData._id === postProps.posterId && (
                <div className="button-container">
                  <div onClick={() => setIsUpdated(!isUpdated)}>
                    <img src="./img/icons/edit.svg" alt="edit" />
                  </div>
                  <DeletePostCard id={postProps._id} text={postProps.message} />
                </div>
              )
            }
            <div className="card-footer">
              <div className="comment-icon">
                <img
                  onClick={() => setShowComments(!showComments)}
                  src="./img/icons/message1.svg"
                  alt="comment"
                />
                <span>{postProps.comments.length}</span>
              </div>
              <IntButton post={postProps} />
              <ConstrucButton post={postProps} />
              <FunnyButton post={postProps} />
              <UnpertButton post={postProps} />
              <img src="./img/icons/share.svg" alt="share" />
            </div>
            {showComments && <CardComment post={postProps} />}
          </div>
        </>
      )}
    </li>
  );
}
