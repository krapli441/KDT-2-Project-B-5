import React, { ChangeEvent, FormEvent, Component } from "react";

interface Video {
  id: { videoId: string };
  snippet: { title: string; description: string };
}

interface Props {
  searchTerm: string;
}

interface State {
  searchTerm: string;
  videos: Video[];
  selectedVideo: Video | null;
}

class YoutubeSearch extends Component<Props, State> {
  state: State = {
    searchTerm: "",
    videos: [],
    selectedVideo: null,
  };

  componentDidMount() {
    const { searchTerm } = this.props;
    if (searchTerm) {
      this.fetchData(searchTerm);
    }
  }

  componentDidUpdate(prevProps: Props) {
    const { searchTerm } = this.props;
    if (searchTerm !== prevProps.searchTerm) {
      this.fetchData(searchTerm);
    }
  }

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Handle any additional logic for searchTerm change if needed
  };

  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { searchTerm } = this.props;
    this.fetchData(searchTerm);
  };

  handleClick = (video: Video) => {
    this.setState({ selectedVideo: video });
  };

  fetchData = async (searchTerm: string) => {
    try {
      // 유튜브 API 호출
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchTerm}&key=AIzaSyAvzFL4fjt0C5gk7b7VWBt5jsSF8ur4MXs`
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
    const { videos, selectedVideo } = this.state;
    const firstVideo = videos[0];

    return (
      <div>
        {/*        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            onChange={this.handleChange}
            title="Search Term"
            placeholder="Enter search term"
          />
          <button type="submit">검색</button>
        </form> */}
        <div>
          {/* 검색 결과 영상 출력, 바로 실행 */}
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
                        src={`https://www.youtube.com/embed/${video.id.videoId}?autoplay=1`}
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
