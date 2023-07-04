import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./blockagePlayList.css";
import Youtube from "../../../../utils/youTube";
import { Box } from "@chakra-ui/layout";

export default function Blockage() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleKeyword = (keyword: string) => {
    setSearchTerm(keyword);
  };
  useEffect(() => {
    handleKeyword("이니셜D"); // 검색어 초기값 설정
  }, []);
  return (
    <div>
      <Box>
        {["/allPlayList"].includes(location.pathname) ? null : (
          <div className="playListHeader">정체</div>
        )}

        <div className="newsArea">
          <Youtube searchTerm={searchTerm} />
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
