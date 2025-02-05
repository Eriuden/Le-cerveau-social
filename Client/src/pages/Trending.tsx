
import { useSelector } from "react-redux";
import { UidContext } from "../components/AppContext";
import {PostCard} from "../components/Post/PostCard"
import Trends from "../components/Trend";
import { isEmpty } from "../components/Utils";
import FriendHint from "../components/Profile/FriendHint";
import { useContext } from "react";

export default function Trending() {
  const uid = useContext(UidContext);
  const trendList = useSelector((state:any) => state.trendingReducer);

  return (
    <div className="trending-page">
      <div className="main">
        <ul>
          {!isEmpty(trendList[0]) &&
            trendList.map((post:any) => <PostCard postProps={post} key={post._id} />)}
        </ul>
      </div>
      <div className="right-side">
        <div className="right-side-container">
          <Trends />
          {uid && <FriendHint />}
        </div>
      </div>
    </div>
  );
}

