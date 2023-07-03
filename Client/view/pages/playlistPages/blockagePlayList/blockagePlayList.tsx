import React from "react";
import "./blockagePlayList.css";
import Youtube from "../../../../utils/youTube";

export default function blockage() {
  return (
    <div>
      <div style={{ width: "340px", height: "10vh" }}> 대충 제목</div>

      <div className="newsArea">
        <div className="newsArea">
          <Youtube />
        </div>
      </div>
    </div>
  );
}
