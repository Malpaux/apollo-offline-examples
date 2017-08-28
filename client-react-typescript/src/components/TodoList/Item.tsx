/**
 * Todo list item
 * @module components/TodoList/Item
 */

import React, { MouseEvent } from 'react';
import { compose, graphql, MutationFunc } from 'react-apollo';
import withStyles, { InjectedProps, InputSheet } from 'react-typestyle-preset';
import { InjectedProps as InjectedThemeProps, withTheme } from 'theming';

import authenticator from '../../modules/authenticator';
import deleteItem from '../../modules/graphql/mutations/deleteitem.gql';
import toggleItem from '../../modules/graphql/mutations/toggleitem.gql';
import itemsQuery from '../../modules/graphql/queries/items.gql';

export interface Props {
  done: boolean;
  id: string;
  name: string;
}

/** Todo list item */
export class Item extends React.PureComponent<Props & InjectedProps & InjectedThemeProps & {
  deleteItem: MutationFunc<any>,
  toggleItem: MutationFunc<any>,
}> {
  public static styles: InputSheet<Props & InjectedThemeProps> = {
    root: (props) => ({
      $nest: {
        '&:hover': {
          color: props.theme.colors.primary,
        },
      },
      cursor: 'pointer',
      lineHeight: '32px',
    }),
  };

  public static inlineStyles: InputSheet<Props> = (props) => ({
    root: {
      textDecoration: props.done && 'line-through',
    },
  })

  constructor(props: Props & InjectedProps & InjectedThemeProps & {
    deleteItem: MutationFunc<any>,
    toggleItem: MutationFunc<any>,
  }) {
    super(props);

    this.click = this.click.bind(this);
  }

  public render() {
    const { classNames, name, styles } = this.props;

    return (
      <li
        className={classNames.root}
        onMouseDown={this.click}
        style={styles.root}
      >
        {name}
      </li>
    );
  }

  protected click(event: MouseEvent<any>) {
    if (event.button === 2) return this.delete();
    this.toggle();
  }

  protected delete() {
    const { id } = this.props;

    this.props.deleteItem({
      optimisticResponse: {
        viewer: {
          __typename: 'MutationViewer',
          deleteItem: {
            __typename: 'DeleteItemPayload',
            success: true,
          },
        },
      },
      update: (store, response: { [key: string]: any }) => {
        if (response.data.viewer.deleteItem.success) {
          const data = store.readQuery({ query: itemsQuery }) as { [key: string]: any };
          data.viewer.items = data.viewer.items.filter((item: { id: string }) => item.id !== id);
          store.writeQuery({ query: itemsQuery, data });
        }
      },
      variables: {
        input: {
          id,
        },
        token: authenticator.getToken(),
      },
    });
  }

  protected toggle() {
    const { done, id, name } = this.props;

    this.props.toggleItem({
      optimisticResponse: {
        viewer: {
          __typename: 'MutationViewer',
          toggleItem: {
            __typename: 'ToggleItemPayload',
            item: {
              __typename: 'Item',
              done: !done,
              id,
              name,
            },
          },
        },
      },
      variables: {
        input: {
          id,
        },
        token: authenticator.getToken(),
      },
    });
  }
}

export default compose<React.ComponentClass<Props>>(
  graphql(deleteItem, { name: 'deleteItem' }),
  graphql(toggleItem, { name: 'toggleItem' }),
)(withTheme(withStyles<Props & InjectedThemeProps & {
  deleteItem: MutationFunc<any>,
  toggleItem: MutationFunc<any>,
}>(Item)));
