/**
 * Simple loading indicator
 * @module components/Loading
 */

import React from 'react';
import withStyles, { InjectedProps, StyledStatelessComponent } from 'react-typestyle-preset';
import { keyframes } from 'typestyle';

/** Rotation animation keyframes */
const rotation = keyframes({
  from: { transform: 'rotate(0deg)' },
  to: { transform: 'rotate(359deg)' },
});

/** Simple loading indicator */
const Loading = ((props: InjectedProps) =>
  <div className={props.classNames.spinner} />) as StyledStatelessComponent<{}>;

Loading.styles = {
  spinner: {
    animation: `${rotation} 0.5s infinite linear`,
    border: '4px solid transparent',
    borderRadius: '100%',
    borderTopColor: 'currentColor',
    height: 48,
    width: 48,
  },
};

export default withStyles<{}>(Loading);
