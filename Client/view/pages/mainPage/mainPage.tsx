import React from "react";
import { Link, BrowserRouter as Router } from "react-router-dom";

import NaverMap from "../../../utils/naverMap";
import { BiSearchAlt2 } from "react-icons/bi";
import { IoMdMenu } from "react-icons/io";

const searchButtonStyle = {
  position: "sticky",
  bottom: "30px",
  fontSize: "42px",
  display: "flex",
  width: "345px",
};

export default function main() {
  return (
    <>
      <IoMdMenu fontSize="32px" />
      <div style={searchButtonStyle}>
        <Link to="/search">
          <BiSearchAlt2 color="#000000" fontSize="32px" />
        </Link>
      </div>
      <NaverMap />
    </>
  );
}
