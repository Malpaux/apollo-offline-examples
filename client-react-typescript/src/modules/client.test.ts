/**
 * @file Apollo client test suite
 */

import { toIdValue } from 'react-apollo';

import { dataIdFromObject, identityResolver } from './client';

it('should generate an unique id from an object', () => {
  expect(dataIdFromObject({ __typename: 'MutationViewer' })).toBe('MutationViewer');
  expect(dataIdFromObject({ __typename: 'QueryViewer' })).toBe('QueryViewer');
  expect(dataIdFromObject({ __typename: 'unknown', id: 'uuid' })).toBe('uuid');
});

it('should resolve to the passed id', () => {
  expect(identityResolver({}, { id: 'uuid' })).toEqual(toIdValue('uuid'));
});
