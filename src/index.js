import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import Search from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail  from './components/video_detail';

const API_KEY = 'AIzaSyDiRfNQflV2mXVD9q8cmkPg98I2DoN54uo';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = { 
      videos: [],
      selectedVideo: null
    };

    this.videoSearch('surfboard');
  }

  videoSearch(term) {
    YTSearch({key: API_KEY, term: term}, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      })
    })
  }

  render() {
    // debounce method to reduce number of calls
    const videoSearch = _.debounce((term) => {this.videoSearch(term), 300});

    return (
      <div>
        <Search onSearchTermChange={videoSearch}/>
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList 
          onVideoSelect={selectedVideo => this.setState({selectedVideo})}
          videos={this.state.videos} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('.container'));
