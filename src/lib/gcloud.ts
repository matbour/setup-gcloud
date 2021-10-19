import { exec } from '@actions/exec';
import { ExecOptions } from '@actions/exec/lib/interfaces';

let bin: string;

/**
 * Set the gcloud executable path.
 * @param {string} path The full path of the gcloud executable.
 */
export function setPath(path: string) {
  bin = path;
}

/**
 * Execute the gcloud command.
 * @param {string[]} args The gcloud args.
 * @param {ExecOptions} options The execute options.
 * @returns {Promise<number>} The gcloud exit code.
 */
export default async function gcloud(args: string[], options?: ExecOptions): Promise<number> {
  return exec(bin, args, options);
}
