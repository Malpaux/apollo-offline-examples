import * as enzyme from 'enzyme';
import React from 'react';
import { ApolloClient, ApolloProvider } from 'react-apollo';
import { ThemeProvider } from 'theming';

import Item from './Item';

describe('Item component', () => {
  it('renders the correct item name', () => {
    const item = enzyme.mount(
      <ApolloProvider client={new ApolloClient()}>
        <ThemeProvider theme={{ colors: {} }}>
          <Item done={false} id="uuid" name="Item Name" />
        </ThemeProvider>
      </ApolloProvider>,
    );
    expect(item.find('li').text()).toEqual('Item Name');
  });
});
