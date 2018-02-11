/**
 * Create todo list item
 * @module components/TodoList/Item
 */

import React, { KeyboardEvent } from 'react';
import { graphql, MutationFunc } from 'react-apollo';
import withStyles, { InjectedProps, InputSheet } from 'react-typestyle-preset';
import { InjectedProps as InjectedThemeProps, withTheme } from 'theming';
import v4 from 'uuid/v4';

import authenticator from '../../modules/authenticator';
import createItem from '../../modules/graphql/mutations/createitem.gql';
import itemsQuery from '../../modules/graphql/queries/items.gql';

/** Create todo list item */
class Create extends React.PureComponent<InjectedProps & InjectedThemeProps & {
  mutate: MutationFunc<any>,
}> {
  public static styles: InputSheet<InjectedThemeProps> = {
    input: ({ theme: { colors } }) => ({
      $nest: {
        '&:focus': {
          borderColor: colors.primary,
        },
      },
      borderBottom: `1px solid ${colors.color}`,
      width: '100%',
    }),
    root: {
      paddingBottom: 12,
    },
  };

  constructor(props: InjectedProps & InjectedThemeProps & {
    mutate: MutationFunc<any>,
  }) {
    super(props);

    this.keyUp = this.keyUp.bind(this);
  }

  public render() {
    const { classNames } = this.props;

    return (
      <li className={classNames.root}>
        <input className={classNames.input} onKeyUp={this.keyUp} placeholder="New item" />
      </li>
    );
  }

  protected keyUp(event: KeyboardEvent<any>) {
    if (event.keyCode === 13) { // Enter key pressed
      const name = (event.target as HTMLInputElement).value;

      this.props.mutate({
        optimisticResponse: {
          viewer: {
            __typename: 'MutationViewer',
            createItem: {
              __typename: 'CreateItemPayload',
              item: {
                __typename: 'Item',
                done: false,
                id: v4(),
                name,
              },
            },
          },
        },
        update: (store, response: { [key: string]: any }) => {
          const data = store.readQuery({ query: itemsQuery }) as { [key: string]: any };
          data.viewer.items.push(response.data.viewer.createItem.item);
          store.writeQuery({ query: itemsQuery, data });
        },
        variables: {
          input: {
            name,
          },
          token: authenticator.getToken(),
        },
      });

      // Reset input field
      (event.target as HTMLInputElement).value = '';
    }
  }
}

export default graphql<{}, {}>(createItem)(withTheme<any>(withStyles<InjectedThemeProps & {
  mutate: MutationFunc<any>,
}>(Create)));
