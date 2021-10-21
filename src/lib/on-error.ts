import { types } from 'util';
import { setFailed } from '@actions/core';

// eslint-disable-next-line @typescript-eslint/ban-types
type Defined = object | Function | number | symbol | boolean | string | bigint;

/**
 * Type-safe error handler which forwards the error to {@link setFailed}.
 * @param {*} error The thrown error.
 */
export default function onError(error: unknown): void {
  if (types.isNativeError(error)) {
    setFailed(error);
    return;
  }

  if (typeof error === 'undefined' || error === null) {
    setFailed('Undefined error (but this should never happen)...');
    return;
  }

  let str = 'Unknown error';

  try {
    str = (error as Defined).toString();
  } catch (_) {}

  setFailed(str);
}
