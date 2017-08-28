/**
 * CSS-in-JS resets
 * @module modules/styles/resets
 */

import { important } from 'csx';
import { cssRule } from 'typestyle';

cssRule('html', {
  fontSize: '1em',
  height: '100%',
  lineHeight: '1.4',
  margin: 0,
  touchAction: 'manipulation',
  width: '100%',
});

cssRule('body', {
  margin: 0,
  minHeight: '100%',
  width: '100%',
});

cssRule('main', {
  display: 'block',
});

cssRule('*[hidden]', {
  display: important('none'),
});

cssRule('div, p, h1, h2, h3, h4, h5, h6', {
  margin: 0,
});

cssRule('::selection', {
  background: '#b3d4fc',
  textShadow: 'none',
});

cssRule('button', {
  userSelect: 'none',
});

cssRule('a, button, input', {
  '-webkit-tap-highlight-color': 'rgba(255, 255, 255, 0)',
});

cssRule('hr', {
  border: 0,
  borderTop: '1px solid #ccc',
  display: 'block',
  height: 1,
  margin: '1em 0',
  padding: 0,
});

cssRule('audio, canvas, iframe, img, svg, video', {
  verticalAlign: 'middle',
});

cssRule('fieldset', {
  border: 0,
  margin: 0,
  padding: 0,
});

cssRule('textarea', {
  resize: 'vertical',
});
