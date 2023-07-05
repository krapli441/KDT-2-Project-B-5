import React, {
  useState,
  ChangeEvent,
  FormEvent,
  useEffect,
  useContext,
} from "react";
import { AuthContext } from "../../../utils/trafficCongestionContext";

interface Video {
  id: { videoId: string };
  snippet: { title: string; description: string };
}

const YoutubeSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const { congestion } = useContext(AuthContext);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchData();
  };

  const handleClick = (video: Video) => {
    setSelectedVideo(video);
  };

  const fetchData = async () => {
    try {
      // 유튜브 API 호출
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${congestion}&key=AIzaSyAvzFL4fjt0C5gk7b7VWBt5jsSF8ur4MXs`
      );

      if (!response.ok) {
        throw new Error("유튜브 API 호출이 실패하였습니다.");
      }

      const data = await response.json();

      // 검색 결과를 상태에 저장
      setVideos(data.items);
      setSelectedVideo(null);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    console.log(congestion);
  }, []);

  setTimeout(() => {
    console.log(firstVideo.id.videoId);
  }, 10000);

  const firstVideo = videos[0];

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={congestion}
          onChange={handleChange}
          title="Search Term"
          placeholder="Enter search term"
        />
        <button type="submit">검색</button>
      </form>
      <div>
        {/* 검색 결과 영상 출력, 바로 실행 */}
        {firstVideo && (
          <div
            key={firstVideo.id.videoId}
            onClick={() => handleClick(firstVideo)}
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
      </div>
    </div>
  );
};

export default YoutubeSearch;
