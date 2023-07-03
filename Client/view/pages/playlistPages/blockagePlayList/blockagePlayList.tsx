import React from "react";
import "./blockagePlayList.css";
import Youtube from "../../../../utils/youTube";
import { Box } from "@chakra-ui/layout";

export default function blockage() {
  return (
    <div>
      <Box>
        <div className="playListHeader">정체</div>

        <div className="newsArea">
          <Youtube />
        </div>
        <div className="otherPlayList">다른 플레이리스트 보기</div>
      </Box>
    </div>
  );
}
