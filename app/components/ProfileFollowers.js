import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useParams, Link } from "react-router-dom";
import LoadingDotsIcon from "./LoadingDotsIcon";

function ProfileFollowers(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [followers, setFollowers] = useState([]);
  const { username } = useParams();

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();

    async function fetchPosts() {
      try {
        const response = await Axios.get(
          `/profile/${username}/${props.action}`,
          {
            cancelToken: ourRequest.token
          }
        );
        setIsLoading(false);
        setFollowers(response.data);
      } catch (e) {
        console.log("There was a problem or the request was cancelled ", e);
      }
    }
    fetchPosts();
    return () => {
      ourRequest.cancel();
    };
  }, [username, props.action]);

  if (isLoading) return <LoadingDotsIcon />;

  return (
    <div className="list-group">
      {followers.length > 0 &&
        followers.map((follower, index) => {
          return (
            <Link
              key={index}
              to={`/profile/${follower.username}`}
              className="list-group-item list-group-item-action"
            >
              <img className="avatar-tiny" src={follower.avatar} />
              {" " + follower.username}
            </Link>
          );
        })}
    </div>
  );
}

export default ProfileFollowers;
