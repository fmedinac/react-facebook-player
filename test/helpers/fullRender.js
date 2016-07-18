/**
 * Module dependencies
 */

import React from 'react';
import ReactDOM from 'react-dom';
import setupPlayer from './setupPlayer';

/**
 * Helper for testing what a component *does* over its lifecycle, actually
 * renders it into the DOM.
 *
 * @param {Object} props -  component instance props
 * @returns {Object}
 */

const fullRender = (props) => {
  const { FacebookPlayer, playerMock } = setupPlayer();

  /**
   * Emulate changes to component.props using a container component's state
   */

  class Container extends React.Component {
    constructor(_props) {
      super(_props);

      // Updating this.state updates the YouTube instance's props now
      this.state = _props;
    }


    render() {
      return <FacebookPlayer { ...this.state } />;
    }
  }

  const div = document.createElement('div');
  const container = ReactDOM.render(<Container { ...props } />, div);

  function rerender(newProps) {
    container.setState(newProps);
  }

  function unmount() {
    ReactDOM.unmountComponentAtNode(div);
  }

  return {
    playerMock,
    rerender,
    unmount,
  };
};

export default fullRender;
