'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FacebookPlayer = function (_Component) {
  _inherits(FacebookPlayer, _Component);

  function FacebookPlayer(props) {
    _classCallCheck(this, FacebookPlayer);

    /**
     * Set events that will be added to listen list.
     * REF: https://developers.facebook.com/docs/plugins/embedded-video-player/api#event-reference
     */

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(FacebookPlayer).call(this, props));

    _this.loadFB = function () {
      if (window.FB) {
        return new Promise(function (resolve) {
          return resolve(window.FB);
        });
      }

      return new Promise(function (resolve) {
        (function (d, s, id) {
          var js,
              fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) {
            return;
          }
          js = d.createElement(s);js.id = id;
          js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.3";
          js.onload = function () {
            resolve(window.FB);
          };
          fjs.parentNode.insertBefore(js, fjs);
        })(document, 'script', 'facebook-jssdk');
      });
    };

    _this.createPlayer = function (videoId) {
      var _this$props = _this.props;
      var id = _this$props.id;
      var appId = _this$props.appId;
      var onReady = _this$props.onReady;

      var FB = _this.FB;

      var playerId = id + '--player';

      // Clear
      _this.container.innerHTML = '';
      _this.unsubscribe();

      var playerDiv = document.createElement('div');
      playerDiv.classList.add('fb-video');
      playerDiv.id = playerId;
      playerDiv.setAttribute('data-href', 'https://www.facebook.com/facebook/videos/' + videoId);
      playerDiv.setAttribute('data-width', '500');
      playerDiv.setAttribute('data-allowfullscreen', 'true');

      _this.container.appendChild(playerDiv);

      FB.init({
        appId: appId,
        xfbml: true,
        version: 'v2.5'
      });

      FB.Event.subscribe('xfbml.ready', function (msg) {
        if (msg.type === 'video' && (id && msg.id === playerId || !id)) {
          _this.videoPlayer = msg.instance;

          // Dispatch ready event
          if (onReady) onReady(_this.videoPlayer);

          // Subscribe to events
          _this.subscribe();
        }
      });
    };

    _this.subscribe = function () {
      _this.eventHandlers = [];
      _this.eventsToListen.map(function (ev) {
        if (ev.listener) _this.eventHandlers.push({
          event: ev.event,
          handler: _this.videoPlayer.subscribe(ev.event, ev.listener)
        });
      });
    };

    _this.unsubscribe = function () {
      if (_this.eventHandlers && _this.eventHandlers.length) {
        _this.eventHandlers.map(function (ev) {
          ev.handler.removeListener(ev.event);
        });
      }
    };

    _this.refContainer = function (container) {
      _this.container = container;
    };

    _this.eventsToListen = [{
      event: 'startedPlaying',
      listener: _this.props.onStartedPlaying
    }, {
      event: 'paused',
      listener: _this.props.onPaused
    }, {
      event: 'finishedPlaying',
      listener: _this.props.onFinishedPlaying
    }, {
      event: 'startedBuffering',
      listener: _this.props.onStartedBuffering
    }, {
      event: 'finishedBuffering',
      listener: _this.props.onFinishedBuffering
    }, {
      event: 'error',
      listener: _this.props.onError
    }];

    _this.FB = null;
    _this.videoPlayer = null;
    _this.eventHandlers = null;
    return _this;
  }

  /**
   * Load Facebook SDK and set FB to global vars
   */


  _createClass(FacebookPlayer, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      var videoId = this.props.videoId;


      if (typeof window !== "undefined") {
        this.loadFB().then(function (res) {
          if (res) {
            _this2.FB = res;
            _this2.createPlayer(videoId);
          }
        });
      }
    }

    /**
     * Refresh component if a new video id is set,
     */

  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      if (this.FB && newProps.videoId !== this.props.videoId) {
        this.createPlayer(newProps.videoId);
      }
    }

    /**
     * Kill all event listeners
     */

  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.unsubscribe();
    }

    /**
     * Load Facebook SDK if it is not loaded already.
     */


    /**
     * Create player.
     *
     * @param {string} Facebook video id
     */


    /**
     * Listen to events based on eventsToListen var.
     */


    /**
     * Stop listening to events.
     */


    /**
     * Set container var to reuse as DOM object.
     */

  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var id = _props.id;
      var className = _props.className;


      return _react2.default.createElement(
        'span',
        null,
        _react2.default.createElement('div', {
          id: id,
          className: className,
          ref: this.refContainer
        })
      );
    }
  }]);

  return FacebookPlayer;
}(_react.Component);

FacebookPlayer.propTypes = {
  id: _react.PropTypes.string,
  className: _react.PropTypes.string,
  appId: _react.PropTypes.string.isRequired,
  videoId: _react.PropTypes.string.isRequired,
  onReady: _react.PropTypes.func,
  onStartedPlaying: _react.PropTypes.func,
  onPaused: _react.PropTypes.func,
  onFinishedPlaying: _react.PropTypes.func,
  onStartedBuffering: _react.PropTypes.func,
  onFinishedBuffering: _react.PropTypes.func,
  onError: _react.PropTypes.func
};
exports.default = FacebookPlayer;