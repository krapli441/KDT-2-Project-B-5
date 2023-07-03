// // export {};
// // import React, { useEffect, useRef } from 'react';

// // declare global {
// //   interface Window {
// //     onYouTubeIframeAPIReady: (() => void) | undefined;
// //     YT: any;
// //   }
// // }

// // const YouTubePlayer: React.FC<{ videoId: string }> = ({ videoId }) => {
// //   const playerRef = useRef<HTMLDivElement | null>(null);

// //   useEffect(() => {
// //     // YouTube iframe API를 동적으로 로드합니다.
// //     const tag = document.createElement('script');
// //     tag.src = 'https://www.youtube.com/iframe_api';
// //     const firstScriptTag = document.getElementsByTagName('script')[0];
// //     firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

// //     // 유튜브 플레이어 API 로드 완료 후 실행될 함수
// //     window.onYouTubeIframeAPIReady = () => {
// //       // 플레이어 생성
// //       new window.YT.Player(playerRef.current!, {
// //         videoId: videoId,
// //         playerVars: {
// //           autoplay: 1, // 자동 재생 설정
// //         },
// //       });
// //     };
// //   }, [videoId]);

// //   return <div ref={playerRef} />;
// // };

// // export default YouTubePlayer;
// import React, { useState, useEffect } from 'react';

// interface Video {
//     id: {
//       videoId: string;
//     };
//     snippet: {
//       title: string;
//       description: string;
//     };
//   }
// const YoutubeSearch = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [videos, setVideos] = useState<Array<Video>>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // 유튜브 API 호출
//         const response = await fetch(
//           `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchTerm}&key=lucky-era-391205`
//         );

//         if (!response.ok) {
//           throw new Error('유튜브 API 호출이 실패하였습니다.');
//         }

//         const data = await response.json();

//         // 검색 결과를 상태에 저장
//         setVideos(data.items);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchData();
//   }, [searchTerm]);

//   const handleSearch = (event:any) => {
//     event.preventDefault();
//     // 검색어 변경 시 상태 업데이트
//     setSearchTerm('beenzino');
//   };

//   return (
//     <div>
//       <form>
//         <input type="text" value={searchTerm} onChange={handleSearch} />
//         <button type="submit">검색</button>
//       </form>
//       <div>
//         {videos.map((video) => (
//           <div key={video.id.videoId}>
//             <h2>{video.snippet.title}</h2>
//             <p>{video.snippet.description}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default YoutubeSearch;
import React, { ChangeEvent, FormEvent, Component } from "react";

interface Video {
  id: { videoId: string };
  snippet: { title: string; description: string };
}

interface State {
  searchTerm: string;
  videos: Video[];
  selectedVideo: Video | null;
}

class YoutubeSearch extends Component<{}, State> {
  state: State = {
    searchTerm: "",
    videos: [],
    selectedVideo: null,
  };

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.fetchData();
  };

  handleClick = (video: Video) => {
    this.setState({ selectedVideo: video });
  };

  fetchData = async () => {
    const { searchTerm } = this.state;

    try {
      // 유튜브 API 호출
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchTerm}&key=AIzaSyA9zqB9QJLqjy1iCTGfgdTNrSo6WpJfRd0`
      );

      if (!response.ok) {
        throw new Error("유튜브 API 호출이 실패하였습니다.");
      }

      const data = await response.json();

      // 검색 결과를 상태에 저장
      this.setState({ videos: data.items, selectedVideo: null });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { searchTerm, videos, selectedVideo } = this.state;
    const firstVideo = videos[0];

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={searchTerm}
            onChange={this.handleChange}
            title="Search Term"
            placeholder="Enter search term"
          />
          <button type="submit">검색</button>
        </form>
        <div>
          // 검색 결과 영상 출력, 바로 실행
          {firstVideo && (
            <div
              key={firstVideo.id.videoId}
              onClick={() => this.handleClick(firstVideo)}
            >
              <iframe
                width="213"
                height="120"
                src={`https://www.youtube.com/embed/${firstVideo.id.videoId}?autoplay=1`}
                title={firstVideo.snippet.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
          // 영상 5개 출력
          {firstVideo && (
            <div>
              {videos.length ? (
                <div>
                  {videos.slice(0, 5).map((video) => (
                    <div
                      key={video.id.videoId}
                      onClick={() => this.handleClick(video)}
                    >
                      <iframe
                        width="213"
                        height="120"
                        src={`https://www.youtube.com/embed/${video.id.videoId}?`}
                        title={video.snippet.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default YoutubeSearch;
