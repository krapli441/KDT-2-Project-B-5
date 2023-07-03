import React from "react";
import { Link } from "react-router-dom";

import "./blockagePlayList.css";
import Youtube from "../../../../utils/youTube";
import { Box } from "@chakra-ui/layout";

export default function blockage() {
  return (
    <div>
      <Box>
        {["/allPlayList"].includes(location.pathname) ? null : (
          <div className="playListHeader">정체</div>
        )}

        <div className="newsArea">
          <Youtube />
        </div>
        {["/allPlayList"].includes(location.pathname) ? null : (
          <Link to="/allPlayList">
            <div className="otherPlayList">다른 플레이리스트 보기</div>
          </Link>
        )}
      </Box>
    </div>
  );
}
