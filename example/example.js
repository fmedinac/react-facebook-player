import React from 'react';
import ReactDOM from 'react-dom';
import FacebookPlayer from '../dist/FacebookPlayer';

const appId = '1789180317985551';
const videoIdA = '1078265308876033';
const videoIdB = '10153231379946729';

class Example extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      videoId: videoIdA,
      player: null,
    };

    this.onReady = this.onReady.bind(this);
    this.onChangeVideo = this.onChangeVideo.bind(this);
    this.onPlayVideo = this.onPlayVideo.bind(this);
    this.onPauseVideo = this.onPauseVideo.bind(this);
  }

  onReady = (player) => {
    console.log(`FacebookPlayer Player object for videoId: "${this.state.videoId}" has been saved to state.`); // eslint-disable-line
    this.setState({
      player: player,
    });
  }

  onPlayVideo = () => {
    this.state.player.play();
  }

  onPauseVideo = () => {
    this.state.player.pause();
  }

  onChangeVideo = () => {
    this.setState({
      videoId: this.state.videoId === videoIdA ? videoIdB : videoIdA,
    });
  }

  onStartedPlaying = () => {
    console.log('Started Playing');
  }

  render() {
    return (
      <div>
        <FacebookPlayer
          videoId={ this.state.videoId }
          appId={ appId }
          onReady={ this.onReady }
          onStartedPlaying={ this.onStartedPlaying }
          width={ 500 }
          />
        <button onClick={this.onPlayVideo}>Play</button>
        <button onClick={this.onPauseVideo}>Pause</button>
        <button onClick={this.onChangeVideo}>Change Video</button>
      </div>
    );
  }
}

ReactDOM.render(<Example />, document.getElementById('root'));
