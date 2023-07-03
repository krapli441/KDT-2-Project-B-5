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
          {selectedVideo ? (
            <div>
              <iframe
                width="142"
                height="80"
                src={`https://www.youtube.com/embed/${selectedVideo.id.videoId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <div>
              {videos.map((video) => (
                <div
                  key={video.id.videoId}
                  onClick={() => this.handleClick(video)}
                >
                  <iframe
                    width="213"
                    height="120"
                    src={`https://www.youtube.com/embed/${video.id.videoId}`}
                    title={video.snippet.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default YoutubeSearch;
