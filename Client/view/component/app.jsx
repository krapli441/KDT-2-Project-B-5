import React, { Component } from 'react';

class YoutubeSearch extends Component {
  state = {
    searchTerm: '',
    videos: [],
    selectedVideo: null,
  };

  handleChange = (event) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.fetchData();
  };

  handleClick = (video) => {
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
        throw new Error('유튜브 API 호출이 실패하였습니다.');
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
          <input type="text" value={searchTerm} onChange={this.handleChange} />
          <button type="submit">검색</button>
        </form>
        <div>
          {selectedVideo && (
            <div>
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${selectedVideo.id.videoId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
          <div>
            {videos.map((video) => (
              <div key={video.id.videoId} onClick={() => this.handleClick(video)}>
                <h2>{video.snippet.title}</h2>
                <p>{video.snippet.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default YoutubeSearch;
