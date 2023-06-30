import React from "react";
import Blockage from "../blockagePlayList/blockagePlayListScreen";
import FunPlayList from "../funPlayList/funPlayListScreen";
import NormalPlayList from "../normalPlayList/normalPlayListScreen";
import StuckPlayList from "../stuckPlayList/stuckPlayListScreen";
import "./overallPlayList.css";

export default function overall() {
  return (
    <>
      <div className="overallMain">
        <Blockage></Blockage>
      </div>
      <div className="overallMain">
        <FunPlayList />
      </div>
      <div className="overallMain">
        <NormalPlayList />
      </div>
      <div className="overallMain">
        <StuckPlayList />
      </div>
    </>
  );
}
