import React from "react";
import { Link, BrowserRouter as Router } from "react-router-dom";

import { AiFillHome } from "react-icons/ai";
import { BiSearchAlt2 } from "react-icons/bi";
import { IoMdMenu } from "react-icons/io";

export default function nav() {
  return (
    <div>
      <IoMdMenu fontSize="40px" />

      <AiFillHome fontSize="40px" />

      <Link to="/search">
        <BiSearchAlt2 color="#000000" fontSize="40px" />
      </Link>
    </div>
  );
}
