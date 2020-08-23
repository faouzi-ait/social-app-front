import React, { useEffect, Fragment } from "react";

import { Switch } from "react-router-dom";

import ScreemDetails from "./ScreemDetails";
import ProtectedRoute from "../../components/utils/ProtectedRoute";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useSelector, useDispatch } from "react-redux";
import Cards from "../utils/Cards";
import Profile from "../utils/Profile";
import { loadScreems } from "../../redux/actions/screems_actions";

function Home() {
  dayjs.extend(relativeTime);
  const dispatch = useDispatch();
  const { screem } = useSelector((state) => state.screems_list);

  useEffect(() => {
    dispatch(loadScreems());
  }, [dispatch]);

  return (
    <>
      <div className="home-container">
        <div className="home-container--left">
          {screem.length > 0 ?
            screem.map((data, i) => (
              <Fragment key={i}>
                <Cards
                  ImgFeed={data.userImage}
                  name={data.user}
                  dob={dayjs(data.createdAt).fromNow()}
                  msg={data.body}
                  likes={data.likeCount}
                  comments={data.commentCount}
                  userHandle={data.userHandle}
                  id={data.screemId}
                />
              </Fragment>
            )) : <div style={{height: "50vh", textAlign: "center", fontSize: "2rem", fontStyle:"italic", paddingTop: "3rem"}}>
                  <div>No posts to display, please create one using the + sign on the header bar</div>
                </div>}
        </div>
        <Profile />
      </div>
      <Switch>
        <ProtectedRoute path="/home/screem" component={ScreemDetails} />
      </Switch>
    </>
  );
}

export default Home;
