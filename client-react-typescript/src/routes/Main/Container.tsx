/**
 * Main container
 * @module routes/Main/Container
 * @author Paul Brachmann
 * @license Copyright (c) 2017 Malpaux IoT All Rights Reserved.
 */

import React from 'react';
import { graphql, QueryProps } from 'react-apollo';

import Loading from '../../components/Loading';
import TodoList from '../../components/TodoList';
import authenticator from '../../modules/authenticator';
import itemsQuery from '../../modules/graphql/queries/items.gql';

export interface Response {
  viewer: {
    items: any[];
  };
}

/**
 * Main container
 * @alias module:routes/Main/Container
 */
class MainContainer extends React.PureComponent<{ data: QueryProps & Response }> {
  /** Render */
  public render() {
    const { data } = this.props;
    if (data.loading) return <Loading />;
    if (data.error) return <div>{data.error.message}</div>;

    return (
      <TodoList items={data.viewer.items} />
    );
  }
}

export default graphql<{}, {}>(itemsQuery, {
  options: () => ({
    fetchPolicy: 'network-only',
    variables: {
      __offline__: true,
      token: authenticator.getToken(),
    },
  }),
})(MainContainer);
