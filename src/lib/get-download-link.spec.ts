import { getInput } from '@actions/core';
import { setInputs } from '../testing/setInputs';
import getDownloadLink from './get-download-link';

jest.mock('@actions/core', () => ({
  getInput: setInputs({
    version: '301.0.0',
    destination: '~/google-cloud-sdk/{version}',
  }),
}));

describe(getDownloadLink, () => {
  let originalPlatform: typeof process.platform;
  let originalArch: typeof process.arch;

  beforeAll(() => {
    originalPlatform = process.platform;
    originalArch = process.arch;
  });

  it.each([
    ['linux', 'x64', 'https://storage.googleapis.com/cloud-sdk-release/google-cloud-sdk-301.0.0-linux-x86_64.tar.gz'],
    ['win32', 'x64', 'https://storage.googleapis.com/cloud-sdk-release/google-cloud-sdk-301.0.0-windows-x86_64.zip'],
    ['darwin', 'x64', 'https://storage.googleapis.com/cloud-sdk-release/google-cloud-sdk-301.0.0-darwin-x86_64.tar.gz'],
    ['linux', 'x32', 'https://storage.googleapis.com/cloud-sdk-release/google-cloud-sdk-301.0.0-linux-x86.tar.gz'],
    ['linux', 'arm64', 'https://storage.googleapis.com/cloud-sdk-release/google-cloud-sdk-301.0.0-linux-arm.tar.gz'],
    ['linux', 'arm', 'https://storage.googleapis.com/cloud-sdk-release/google-cloud-sdk-301.0.0-linux-arm.tar.gz'],
  ] as [typeof process.platform, typeof process.arch, string][])(
    'should build download URL for %p on %p',
    (platform, arch, expected) => {
      Object.defineProperties(process, {
        platform: { value: platform },
        arch: { value: arch },
      });

      expect(getDownloadLink()).toBe(expected);
    },
  );

  it.each([
    ['aix', 'x64', 'Unsupported platform: aix'],
    ['linux', 's390x', 'Unsupported arch: s390x'],
  ] as [typeof process.platform, typeof process.arch, string][])(
    'should throws %p %p %p',
    (platform, arch, message) => {
      Object.defineProperties(process, {
        platform: { value: platform },
        arch: { value: arch },
      });

      expect(() => getDownloadLink()).toThrowError(message);
    },
  );

  afterAll(() => {
    Object.defineProperties(process, {
      platform: { value: originalPlatform },
      arch: { value: originalArch },
    });
  });
});
