import React, { useState, useEffect } from 'react';

const YoutubeSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 유튜브 API 호출
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchTerm}&key=lucky-era-391205`
        );

        if (!response.ok) {
          throw new Error('유튜브 API 호출이 실패하였습니다.');
        }

        const data = await response.json();

        // 검색 결과를 상태에 저장
        setVideos(data.items);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [searchTerm]);

  const handleSearch = (event) => {
    event.preventDefault();
    // 검색어 변경 시 상태 업데이트
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <form>
        <input type="text" value={searchTerm} onChange={handleSearch} />
        <button type="submit">검색</button>
      </form>
      <div>
        {videos.map((video) => (
          <div key={video.id.videoId}>
            <h2>{video.snippet.title}</h2>
            <p>{video.snippet.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YoutubeSearch;
