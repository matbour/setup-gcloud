import {getCloudSDKFolder, isWindows} from './utils';
import {resolve} from "path";
import * as core from '@actions/core';
import * as exec from '@actions/exec';

export async function setup() {
    const installScriptExtension = isWindows() ? 'bat' : 'sh';
    const installScript = resolve(getCloudSDKFolder(), `install.${installScriptExtension}`);
    let args: string[];

    if (isWindows()) {
        // args = ['/S', `/D=${getCloudSDKFolder()}`, '/singleuser', '/noreporting', '/nostartmenu', '/nodesktop'];
        args = [
            '--usage-reporting=false',
            '--command-completion=false',
            '--path-update=false',
            '--usage-reporting=false',
            // '--additional-components',
            '--quiet'
        ];
    } else {
        args = [
            '--usage-reporting=false',
            '--command-completion=false',
            '--path-update=false',
            '--usage-reporting=false',
            // '--additional-components',
            '--quiet'
        ];
    }

    try {
        if (isWindows()) {
            await exec.exec(`${installScript} ${args.join(' ')}`);
        } else {
            await exec.exec(installScript, args);
        }
    } catch (e) {
        core.error(e.message);
        process.exit(1);
    }

    const binPath = resolve(getCloudSDKFolder(), 'bin');
    core.addPath(binPath);
}
