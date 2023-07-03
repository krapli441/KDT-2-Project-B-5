// export {};
// import React, { useEffect, useRef } from 'react';

// declare global {
//   interface Window {
//     onYouTubeIframeAPIReady: (() => void) | undefined;
//     YT: any;
//   }
// }

// const YouTubePlayer: React.FC<{ videoId: string }> = ({ videoId }) => {
//   const playerRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     // YouTube iframe API를 동적으로 로드합니다.
//     const tag = document.createElement('script');
//     tag.src = 'https://www.youtube.com/iframe_api';
//     const firstScriptTag = document.getElementsByTagName('script')[0];
//     firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

//     // 유튜브 플레이어 API 로드 완료 후 실행될 함수
//     window.onYouTubeIframeAPIReady = () => {
//       // 플레이어 생성
//       new window.YT.Player(playerRef.current!, {
//         videoId: videoId,
//         playerVars: {
//           autoplay: 1, // 자동 재생 설정
//         },
//       });
//     };
//   }, [videoId]);

//   return <div ref={playerRef} />;
// };

// export default YouTubePlayer;
import React, { useState } from 'react';
import axios from 'axios';

const API_KEY = 'lucky-era-391205';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [videoId, setVideoId] = useState('');

  const handleKeyPress = async (e) => {
    if (e.key === 'Enter') {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&q=${encodeURIComponent(
            searchTerm
          )}&part=snippet&type=video&maxResults=1&autoplay=1`
        );
        const videoId = response.data.items[0]?.id.videoId;
        if (videoId) {
          setVideoId(videoId);
        }
      } catch (error) {
        console.error('Failed to fetch YouTube data:', error);
      }
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      {videoId ? (
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${videoId}`}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      ) : (
        <p>검색 결과를 입력하세요.</p>
      )}
    </div>
  );
};

export default App;