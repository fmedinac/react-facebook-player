import React, { Component, PropTypes } from 'react';

class FacebookPlayer extends Component {
  static propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    appId: PropTypes.string.isRequired,
    videoId: PropTypes.string.isRequired,
    width: PropTypes.number,
    allowfullscreen: PropTypes.string,
    autoplay: PropTypes.string,
    showText: PropTypes.string,
    showCaptions: PropTypes.string,
    onReady: PropTypes.func,
    onStartedPlaying: PropTypes.func,
    onPaused: PropTypes.func,
    onFinishedPlaying: PropTypes.func,
    onStartedBuffering: PropTypes.func,
    onFinishedBuffering: PropTypes.func,
    onError: PropTypes.func,
  };

  constructor(props) {
    super(props);

    /**
     * Set events that will be added to listen list.
     * REF: https://developers.facebook.com/docs/plugins/embedded-video-player/api#event-reference
     */
    this.eventsToListen = [
      {
        event: 'startedPlaying',
        listener: this.props.onStartedPlaying,
      },
      {
        event: 'paused',
        listener: this.props.onPaused,
      },
      {
        event: 'finishedPlaying',
        listener: this.props.onFinishedPlaying,
      },
      {
        event: 'startedBuffering',
        listener: this.props.onStartedBuffering,
      },
      {
        event: 'finishedBuffering',
        listener: this.props.onFinishedBuffering,
      },
      {
        event: 'error',
        listener: this.props.onError,
      },
    ];

    this.FB = null;
    this.videoPlayer = null;
    this.eventHandlers = null;
  }

  /**
   * Load Facebook SDK and set FB to global vars
   */
  componentDidMount() {
    const {
      videoId,
    } = this.props;

    if (typeof window !== "undefined") {
      this.loadFB()
        .then(res => {
          if (res) {
            this.FB = res;
            this.createPlayer(videoId);
          }
        });
    }
  }

  /**
   * Refresh component if a new video id is set,
   */
  componentWillReceiveProps(newProps) {
    if (this.FB && newProps.videoId !== this.props.videoId) {
      this.createPlayer(newProps.videoId);
    }
  }

  /**
   * Kill all event listeners
   */
  componentWillUnmount() {
    this.unsubscribe();
  }

  /**
   * Load Facebook SDK if it is not loaded already.
   */
  loadFB = () => {
    if(window.FB) {
      return new Promise(resolve => resolve(window.FB));
    }

    return new Promise(resolve => {
      (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.3";
        js.onload = function() {
          resolve(window.FB);
        }
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    });
  }

  /**
   * Create player.
   *
   * @param {string} Facebook video id
   */
  createPlayer = (videoId) => {
    const {
      id,
      appId,
      allowfullscreen,
      autoplay,
      width,
      showText,
      showCaptions,
      onReady,
    } = this.props;
    const FB = this.FB;

    const playerId = id + '--player';

    // Clear
    this.container.innerHTML = '';
    this.unsubscribe();

    const playerDiv = document.createElement('div');
    playerDiv.classList.add('fb-video');
    playerDiv.id = playerId;
    playerDiv.setAttribute('data-href', 'https://www.facebook.com/facebook/videos/' + videoId);
    playerDiv.setAttribute('data-allowfullscreen', allowfullscreen || 'false');
    playerDiv.setAttribute('data-autoplay', autoplay || 'false');
    playerDiv.setAttribute('data-width', width || 'auto');
    playerDiv.setAttribute('data-show-text', showText || 'false');
    playerDiv.setAttribute('data-show-captions', showCaptions || 'false');

    this.container.appendChild(playerDiv);

    FB.init({
      appId      : appId,
      xfbml      : true,
      version    : 'v2.5'
    });


    FB.Event.subscribe('xfbml.ready', msg => {
      if (msg.type === 'video' &&
          (
            (id && msg.id === playerId) ||
            !id
          )
          ) {
        this.videoPlayer = msg.instance;

        // Dispatch ready event
        if (onReady) onReady(this.videoPlayer);

        // Subscribe to events
        this.subscribe();
      }
    });
  }

  /**
   * Listen to events based on eventsToListen var.
   */
  subscribe = () => {
    this.eventHandlers = [];
    this.eventsToListen.map(ev => {
      if (ev.listener) this.eventHandlers.push({
        event: ev.event,
        handler: this.videoPlayer.subscribe(ev.event, ev.listener)
      });
    });
  }

  /**
   * Stop listening to events.
   */
  unsubscribe = () => {
    if (this.eventHandlers && this.eventHandlers.length) {
      this.eventHandlers.map(ev => {
        ev.handler.removeListener(ev.event);
      });
    }
  }

  /**
   * Set container var to reuse as DOM object.
   */
  refContainer = (container) => {
    this.container = container;
  }

  render() {
    const { id, className } = this.props;

    return (
      <span>
        <div
          id={ id }
          className={ className }
          ref={ this.refContainer }
          />
      </span>
    );
  }
}

export default FacebookPlayer;
