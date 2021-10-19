import { setFailed } from '@actions/core';
import onError from './on-error';

jest.mock('@actions/core');

describe(onError, () => {
  it('should forward native errors', () => {
    const error = new Error();
    onError(error);
    expect(setFailed).toHaveBeenCalledWith(error);
  });
});
