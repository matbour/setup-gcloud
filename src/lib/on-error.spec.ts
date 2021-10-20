import { setFailed } from '@actions/core';
import onError from './on-error';

jest.mock('@actions/core');

describe(onError, () => {
  it('should forward native errors', () => {
    const error = new Error();
    onError(error);
    expect(setFailed).toHaveBeenCalledWith(error);
  });

  it('should forward error messages', () => {
    const error = 'This is an error';
    onError(error);
    expect(setFailed).toHaveBeenCalledWith(error);
  });

  it.each([[undefined], [null]])('should fallback to unknown error message', (nil) => {
    onError(nil);
    expect(setFailed).toHaveBeenCalledWith('Undefined error (but this should never happen)...');
  });
});
