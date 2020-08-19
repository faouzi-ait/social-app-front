import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import CommentIcon from "@material-ui/icons/Comment";
import DeleteIcon from "@material-ui/icons/Delete";
import { likeScreem, unlikeScreem } from "../../redux/actions/like_actions";
import { deleteScreem } from "../../redux/actions/screems_actions";

import EditIcon from "@material-ui/icons/Edit";

import Tippy from "@tippy.js/react";
import { confirmAlert } from "react-confirm-alert";

import "react-confirm-alert/src/react-confirm-alert.css";
import "tippy.js/dist/tippy.css";

function Cards({ ImgFeed, name, dob, msg, likes, comments, userHandle, id }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const likeList = useSelector((state) => state.like_screems.likes);
  const currentUser = useSelector(
    (state) => state.user_profile?.data?.profile?.userId
  );
  const authenticated = useSelector((state) => state.login.isAuthenticated);

  const currentUserLikeList = likeList
    .filter((item) => item.user === currentUser)
    .map((item) => item.screemId);

  const handleDeleteScreem = (e) => {
    confirmAlert({
      title: "",
      message: "Are you sure you want to delete this post",
      buttons: [
        {
          label: "Yes",
          onClick: () => dispatch(deleteScreem(id)),
        },
        {
          label: "No",
          onClick: () => console.log("Click No"),
        },
      ],
    });
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <>
      <div className="cards">
        <div className="cards--img">
          <img src={ImgFeed} alt="feed" />
        </div>

        {authenticated && userHandle === currentUser && (
          <Tippy content="Delete">
            <span className="card--delete" onClick={handleDeleteScreem}>
              <DeleteIcon />
            </span>
          </Tippy>
        )}
        <div className="cards--info">
          <span style={{ cursor: "pointer" }}>{capitalizeFirstLetter(name.split("@")[0])}</span>
          <span>{dob}</span>
          <span>{msg}</span>
          <div style={{ display: "flex", alignItems: "center" }}>
            {currentUserLikeList.includes(id) ? (
              <p
                onClick={() => dispatch(unlikeScreem(id))}
                className="screem_options"
              >
                <FavoriteIcon /> <span>{likes} likes</span>
              </p>
            ) : (
              <p
                onClick={() => dispatch(likeScreem(id))}
                className="screem_options"
              >
                <FavoriteBorderIcon /> <span>{likes} likes</span>
              </p>
            )}
            <p className="screem_comments">
              <CommentIcon /> <span>{comments} comments</span>
            </p>
            <Tippy content="Post Details">
              <EditIcon
                onClick={() => history.push(`/home/screem`, id)}
                className="edit-screem"
              />
            </Tippy>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cards;
