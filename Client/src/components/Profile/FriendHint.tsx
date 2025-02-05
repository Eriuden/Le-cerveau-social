import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "../Utils";
import FollowHandler from "./followHandler";

export default function FriendHint() {
  const [isLoading, setIsLoading] = useState(true);
  const [playOnce, setPlayOnce] = useState(true);
  const [friendsHint, setFriendsHint] = useState([]);
  const userData = useSelector((state:any) => state.userReducer);
  const usersData = useSelector((state:any) => state.usersReducer);

  useEffect(() => {

    const notFriendList = () => {
      let array:any = [];
      usersData.map((user:any) => {
        if (user._id !== userData._id && user.followers.includes(userData._id)){return array.push(user.id)}
          return user
      });
      array.sort(() => 0.5 - Math.random());
      if (window.innerHeight > 780) {
        array.length = 5;
      } else if (window.innerHeight > 720) {
        array.length = 4;
      } else if (window.innerHeight > 615) {
        array.length = 2;
      } else if (window.innerHeight > 540) {
        array.length = 1;
      } else {
        array.length = 0;
      }
      setFriendsHint(array);
    };
    if (playOnce && !isEmpty(usersData[0]) && !isEmpty(userData._id)) {
      notFriendList();
      setIsLoading(false);
      setPlayOnce(false);
    }
  }, [usersData, userData, playOnce]);

  return (
    <div className="get-friends-container">
      <h4>Suggestions</h4>
      {isLoading ? (
        <div className="icon">
          <i className="fas fa-spinner fa-pulse"></i>
        </div>
      ) : (
        <ul>
          {friendsHint &&
            friendsHint.map((user:any) => {
              for (let i = 0; i < usersData.length; i++) {
                if (user === usersData[i]._id) {
                  return (
                    <li className="user-hint" key={user}>
                      <img src={usersData[i].pictures} alt="user-pictures" />
                      <p>{usersData[i].pseudo}</p>
                      <FollowHandler
                        idToFollow={`${usersData[i]._id}`}
                        type={"suggestion"}
                      />
                    </li>
                  );
                }
              }
            return user
            })}
        </ul>
      )}
    </div>
  );
}
