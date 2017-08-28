/**
 * CSS-in-JS base styles
 * @module modules/styles/base
 */

import { cssRaw, cssRule } from 'typestyle';

import './resets';
import { background, color } from './theme/colors';

cssRaw(`
  html {
    touch-action: pan-x pan-y;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button,
  input,
  select {
    background: transparent;
    border: 0;
    color: inherit;
    font: inherit;
  }

  button:focus,
  input:focus,
  select:focus {
    outline: 0;
  }

  button,
  input[type='submit'],
  input[type='clear'] {
    cursor: pointer;
  }
`);

cssRule('body', {
  background,
  color,
  fontFamily: `'Open Sans', 'Helvetica', 'Arial', sans-serif`,
  fontSize: 14,
  fontWeight: 300,
  height: '100%',
});

cssRule('.root', {
  backfaceVisibility: 'hidden',
  boxSizing: 'border-box',
  height: '100%',
  overflow: 'hidden',
  position: 'relative',
});
