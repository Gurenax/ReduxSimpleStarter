import _, { debounce } from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';

// Our components
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

// API Key for YouTube stored in .env
const API_KEY = process.env.YOUTUBE_API_KEY;

// Create a new component.
// This component should produce some HTML.
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null
    };

    this.videoSearch('surfboards');
  }

  videoSearch(term) {
    YTSearch({key: API_KEY, term: term}, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0] // Select the first video by default
      });
    });
  }

  render() {

    // Call this.videoSearch once only every 300ms
    const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);

    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
          // onVideoSelect={chosenVideo => this.setState({selectedVideo: chosenVideo})}
          onVideoSelect={selectedVideo => this.setState({selectedVideo})} // Refactor
          videos={this.state.videos}
        />
      </div>
    );
  }
}

// Take this component's generated HTML
// and put it on the page (in the DOM).
ReactDOM.render(<App />, document.querySelector('.container'));