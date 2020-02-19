> This project is deprecated and I don't recommend using it. Please `fork` it and upgrade before using.

react-facebook-player
=============================

Based on [react-youtube](https://github.com/compedit/react-youtube), this component makes easier to integrate your [React](http://facebook.github.io/react/) project with [Facebook's Embedded Video Player API](https://developers.facebook.com/docs/plugins/embedded-video-player/api).

## Installation

```
$ npm install react-facebook-player --save
```

## Usage

```js
const FacebookPlayer = require('react-facebook-player');

<FacebookPlayer
  appId={ string }                                    // (required) Your Facebook App ID. Ref: http://bit.ly/1GNA0AN
  videoId={ string }                                  // (required) Video´s ID Ref: http://bit.ly/1ysgVu4
  id={ string }                                       // Element ID. Required if you wanna use more than one video in the same page.
  className={ string }                                // Element class.
  /* ATTRIBUTES. Ref: http://bit.ly/29OOzWZ */
  allowfullscreen={ boolean }
  autoplay={ boolean }
  width={ number }
  showText={ boolean }
  showCaptions={ boolean }
  /* EVENTS. Ref: http://bit.ly/29JaA7J */
  onReady={ function }                                // Returns a player object to be used for controlling
  onStartedPlaying={ function }
  onPaused={ function }
  onFinishedPlaying={ function }
  onStartedBuffering={ function }
  onFinishedBuffering={ function }
  onError={ function }
  />
```

You can use onReady() to assign the player to a state and then control it (http://bit.ly/29Oxmgm).

```js
import React from 'react';
import ReactDOM from 'react-dom';
import FacebookPlayer from 'react-facebook-player';

class Example extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      player: null,
    };
  }

  onReady = (id, player) => {
    this.setState({
      player: player,
    });
  }

  playVideo = () => {
    const { player } = this.state;
    if (player) player.play();
  }

  pauseVideo = () => {
    const { player } = this.state;
    if (player) player.pause();
  }

  render() {
    const { videoId, appId } = this.props;
    return (
      <div>
        <FacebookPlayer
          videoId={ videoId }
          appId={ appId }
          onReady={ this.onReady }
          />
        <button onClick={ this.playVideo }>Play</button>
        <button onClick={ this.pauseVideo }>Pause</button>
      </div>
    );
  }
}

ReactDOM.render(<Example />, document.getElementById('root'));
```

# License

  MIT
