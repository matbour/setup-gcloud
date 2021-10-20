import { exec } from '@actions/exec';
import gcloud, { setPath } from './gcloud';

jest.mock('@actions/exec');

describe('gcloud', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('should set the gcloud path', async () => {
    setPath('/usr/local/bin/gcloud');
    await gcloud(['foo', 'bar']);
    expect(exec).toHaveBeenCalledWith('/usr/local/bin/gcloud', ['foo', 'bar'], undefined);
  });

  it('should set the gcloud path with quotes', async () => {
    setPath('C:/Program Files/google-cloud-sdk');
    await gcloud(['foo', 'bar']);
    expect(exec).toHaveBeenCalledWith('"C:/Program Files/google-cloud-sdk"', ['foo', 'bar'], undefined);
  });

  it('should throw an error if path is undefined', async () => {
    setPath(undefined);
    await expect(gcloud(['foo', 'bar'])).rejects.toThrow('gcloud executable was not defined');
  });
});
