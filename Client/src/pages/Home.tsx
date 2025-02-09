import { UidContext } from "../components/AppContext";
import NewPostForm from "../components/Post/NewPostForm";
import Thread from "../components/Thread";
import Trends from "../components/Trend";
import FriendHint from "../components/Profile/FriendHint";
import { useContext } from "react";

export default function Home() {
  const uid = useContext(UidContext);
  return (
    <div className="home">
      <div className="main">
        <div className="home-header">
          {uid ? ( 
            <NewPostForm />
          ) : (
            "" 
          )}
        </div>
        <Thread />
      </div>
      <div className="right-side">
        <div className="right-side-container">
          <div className="wrapper">
            <Trends />
            {uid && <FriendHint />}
          </div>
        </div>
      </div>
    </div>
  );
}



