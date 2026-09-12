import { mapHttpStatusToCode } from '../src/core/network/ApiError';

describe('mapHttpStatusToCode', () => {
  test.each([
    [400, 'bad_request'],
    [401, 'unauthorized'],
    [403, 'forbidden'],
    [404, 'not_found'],
    [409, 'conflict'],
    [422, 'validation'],
    [429, 'rate_limited'],
    [500, 'server_error'],
    [503, 'server_error'],
    [418, 'unknown'],
  ])('maps %i to %s', (status, expected) => {
    expect(mapHttpStatusToCode(status)).toBe(expected);
  });
});
