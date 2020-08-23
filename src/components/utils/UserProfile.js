import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { uploadProfilePicture } from "../../redux/actions/upload_action";
import FormDialog from "./EditDetails";
import { IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";

function UserProfile({ profile }) {
  const dispatch = useDispatch();
  const {
    imageUrl,
    firstname,
    createdAt,
    bio,
    location,
    website,
  } = profile.profile;
  const { isPictureUploading } = useSelector(
    (state) => state.uploading_picture
  );

  const handleUpdateProfilePicture = (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    dispatch(uploadProfilePicture(formData));
  };

  const handleEditPicture = () => {
    const fileInput = document.getElementById("profileImage");
    fileInput.click();
  };

  console.log(imageUrl)

  return (
    <div className="profile__container">
      {!isPictureUploading && imageUrl && firstname && createdAt ? (
        <div className="profile__container--image">
          <img src={imageUrl} alt="user" />
          <input
            type="file"
            id="profileImage"
            onChange={handleUpdateProfilePicture}
            accept="image/png"
            hidden="hidden"
          />
          <Tippy content="Change Picture">
            <IconButton onClick={handleEditPicture} className="picture-btn">
              <EditIcon style={{ color: "#0099FF", fontSize: "3rem" }} />
            </IconButton>
          </Tippy>
        </div>
      ) : (
        <div className="uploading-picture">
          <div className="image-loader"></div>
        </div>
      )}
      <div className="profile__container--name">@{firstname}</div>
      {bio && <div className="profile__container--date">{bio}</div>}
      {location && <div className="profile__container--date">{location}</div>}
      {website && <div className="profile__container--date">{website}</div>}
      <div className="profile__container--date mb">
        <span role="img" aria-label="joining-date">
          &#128197;
        </span>{" "}
        {createdAt.split("T")[0]}
      </div>
      <FormDialog />
    </div>
  );
}

export default UserProfile;
