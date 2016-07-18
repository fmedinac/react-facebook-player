/**
 * Module dependencies
 */

import assign from 'lodash/assign';
import expect from 'expect';
import proxyquire from 'proxyquire';

/**
 * Create & provide access to a mocked facebook player used inside `FacebookPlayer`
 *
 * @returns {Object}
 */

const setupPlayer = () => {
  const playerMethods = {
    on: expect.createSpy().andReturn(Promise.resolve()),
    cueVideoById: expect.createSpy().andReturn(Promise.resolve()),
    loadVideoById: expect.createSpy().andReturn(Promise.resolve()),
    getIframe: expect.createSpy().andReturn(Promise.resolve()),
    stopVideo: expect.createSpy().andReturn(Promise.resolve()),
    destroy: expect.createSpy().andReturn(Promise.resolve()),
  };
  const playerMock = expect.createSpy().andReturn(playerMethods);

  // Add the mocked methods to the playerMock object too, so they can be
  // accessed easily by tests.
  assign(playerMock, playerMethods);

  const FacebookPlayer = proxyquire('../../src/FacebookPlayer', {
    'facebook-player': playerMock,
  }).default;

  return {
    playerMock,
    FacebookPlayer,
  };
};

export default setupPlayer;
