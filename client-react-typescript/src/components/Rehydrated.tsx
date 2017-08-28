/**
 * Component showing a loading indicator until the redux store has been hydrated
 * @module components/Rehydrated
 */

import { connect } from 'react-redux';

/** Component showing a loading indicator until the redux store has been hydrated */
const Rehydrated = (
  (props) => props.rehydrated ?
    props.children
  : props.loading
) as React.StatelessComponent<{
  loading?: React.ReactElement<any>,
  rehydrated: boolean,
}>;

export default connect<{ rehydrated: boolean }, object, { loading?: React.ReactElement<any> }>(
  ({ rehydrated }) => ({ rehydrated }),
)(Rehydrated);
