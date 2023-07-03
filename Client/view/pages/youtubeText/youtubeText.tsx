export {};
import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    onYouTubeIframeAPIReady: (() => void) | undefined;
    YT: any;
  }
}

const YouTubePlayer: React.FC<{ videoId: string }> = ({ videoId }) => {
  const playerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // YouTube iframe API를 동적으로 로드합니다.
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    // 유튜브 플레이어 API 로드 완료 후 실행될 함수
    window.onYouTubeIframeAPIReady = () => {
      // 플레이어 생성
      new window.YT.Player(playerRef.current!, {
        videoId: videoId,
        playerVars: {
          autoplay: 1, // 자동 재생 설정
        },
      });
    };
  }, [videoId]);

  return <div ref={playerRef} />;
};

export default YouTubePlayer;
