import React from "react";
import { Link, BrowserRouter as Router } from "react-router-dom";

import NaverMap from "../../../utils/naverMap";
import { BiSearchAlt2 } from "react-icons/bi";
import { IoMdMenu } from "react-icons/io";
import { MdOutlineGpsFixed } from "react-icons/md";

const searchButtonStyle: React.CSSProperties = {
  position: "sticky",
  bottom: "30px",
  fontSize: "42px",
  display: "flex",
};

export default function main() {
  return (
    <>
      <IoMdMenu fontSize="40px" />
      <div style={searchButtonStyle}>
        <Link to="/search">
          <BiSearchAlt2 color="#000000" fontSize="40px" />
        </Link>
      </div>
      <div className="PlayButton"></div>
      <MdOutlineGpsFixed fontSize="40px" />
      <NaverMap />
    </>
  );
}
