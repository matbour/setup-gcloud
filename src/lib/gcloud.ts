import { debug } from '@actions/core';
import { exec } from '@actions/exec';
import { ExecOptions } from '@actions/exec/lib/interfaces';

let bin: string | undefined;

/**
 * Set the gcloud executable path.
 * @param {string} path The full path of the gcloud executable.
 */
export function setPath(path: string | undefined) {
  if (!path) {
    bin = undefined;
    return;
  }

  bin = !path.includes(' ') ? path : `"${path}"`; // Wrap the execute around quotes if contains spaces
  debug(`Set gcloud bin at ${bin}`);
}

/**
 * Execute the gcloud command.
 * @param {string[]} args The gcloud args.
 * @param {ExecOptions} options The execute options.
 * @returns {Promise<number>} The gcloud exit code.
 */
export default async function gcloud(args: string[], options?: ExecOptions): Promise<number> {
  if (!bin) {
    throw new Error('gcloud executable was not defined');
  }

  return exec(bin, args, options);
}
