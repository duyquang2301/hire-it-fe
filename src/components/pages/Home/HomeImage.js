import React from "react";

function HomeImage(props) {
  return (
    <div className="p-0 home-image-container">
      <div className="justify-content-md-center">
        <img
          src={props.imgSrc || ""}
          className="img-fluid float-right rounded"
          alt=""
        />
      </div>
    </div>
  );
}

export default HomeImage;
