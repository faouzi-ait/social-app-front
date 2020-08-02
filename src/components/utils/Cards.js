import React from "react";

function Cards({ ImgFeed, name, dob, msg }) {
  return (
    <div className="cards">
      <div className="cards--img">
        <img src={ImgFeed} alt="feed" />
      </div>
      <div className="cards--info">
        <span>{name}</span>
        <span>{dob}</span>
        <span>{msg}</span>
      </div>
    </div>
  );
}

export default Cards;
