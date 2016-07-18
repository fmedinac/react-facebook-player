/* eslint max-len: 0 */
import expect from 'expect';
import shallowRender from './helpers/shallowRender';
import fullRender from './helpers/fullRender';

describe('FacebookPlayer', () => {
  // See helpers/setupEnvironment.
  const HTMLDivElement = window.HTMLDivElement;


  it('should render a div with a custom id', () => {
    const { output } = shallowRender({
      appId: '1789180317985551',
      videoId: '10153231379946729',
      id: 'custom-id',
    });

    const div = output.props.children;
    expect(div.props.id).toBe('custom-id');
  });

  it('should render a div with a custom className', () => {
    const { output } = shallowRender({
      appId: '1789180317985551',
      videoId: '10153231379946729',
      className: 'custom-class',
    });

    const div = output.props.children;
    expect(div.props.className).toBe('custom-class');
  });

  it('should load Facebook SDK', () => {
    // TO DO
  });

  it('should play a video', () => {
    // TO DO
  });

  it('should pause a video', () => {
    // TO DO
  });

  it('should mute a video', () => {
    // TO DO
  });

  it('should change video\'s position in time', () => {
    // TO DO
  });

  it('should replace a video', () => {
    // TO DO
  });

});
