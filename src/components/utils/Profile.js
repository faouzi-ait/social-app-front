import React from "react";
import { useSelector } from "react-redux";
import ProfileCard from "./UserProfile";
import NotLoggedIn from "./LoadingProfile";

function Profile() {
  const profile = useSelector((state) => state.user_profile);
  

  return (
    <div className="home-container--right">
      <div className="profile">
        {profile.data ? (
          <ProfileCard profile={profile.data} />
        ) : (
          <NotLoggedIn />
        )}
      </div>
    </div>
  );
}

export default Profile;
