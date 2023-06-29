import React from "react";
import { Link } from "react-router-dom";

import Kakaomap from "../../../utils/kakaoMap";
import { BiSearchAlt2 } from "react-icons/bi";
import { IoMdMenu } from "react-icons/io";

export default function main() {
  return (
    <>
      <IoMdMenu fontSize="32px" />
      <Link to="/search">
        <BiSearchAlt2 color="#000000" fontSize="32px" />
      </Link>
      <Kakaomap />
    </>
  );
}
