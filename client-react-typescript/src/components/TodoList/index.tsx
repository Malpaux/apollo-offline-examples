/**
 * Todo list component
 * @module components/TodoList
 */

import React from 'react';
import withStyles, { InjectedProps, InputSheet } from 'react-typestyle-preset';

import Create from './Create';
import Item, { Props as ItemProps } from './Item';

export interface Props {
  items: ItemProps[];
}

/** Todo list component */
class TodoList extends React.PureComponent<Props & InjectedProps, object> {
  public static styles: InputSheet<Props> = {
    list: {
      flex: 1,
      fontSize: '1.2em',
      listStyle: 'none',
      margin: 0,
      maxWidth: 960,
      overflowX: 'hidden',
      overflowY: 'auto',
      padding: 0,
    },
    root: {
      boxSizing: 'border-box',
      display: 'flex',
      height: '100%',
      justifyContent: 'center',
      paddingBottom: 48,
      paddingTop: 48,
    },
  };

  protected static preventDefault(event: any) { event.preventDefault(); }

  public render() {
    const { classNames, items } = this.props;

    return (
      <div className={classNames.root} onContextMenu={TodoList.preventDefault}>
        <ul className={classNames.list}>
          <Create />
          {items.map((item) =>
              <Item key={item.id} done={item.done} id={item.id} name={item.name} />)}
        </ul>
      </div>
    );
  }
}

export default withStyles<Props>(TodoList);
