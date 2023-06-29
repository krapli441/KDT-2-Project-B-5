import React from "react";
import { Link } from "react-router-dom";

import Kakaomap from "../../../utils/kakaoMap";
import { BiSearchAlt2 } from "react-icons/bi";
export default function main() {
  return (
    <>
      <Link to="/search">
        <BiSearchAlt2 color="#ffffff" />
      </Link>

      <Kakaomap />
    </>
  );
}
