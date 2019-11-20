import {getCloudSDKFolder, isWindows} from './utils';
import {resolve} from "path";
import * as core from '@actions/core';
import * as exec from '@actions/exec';
import {lstatSync, readdirSync} from 'fs';

export async function setup() {
    const installScriptExtension = isWindows() ? 'bat' : 'sh';
    const installScript = resolve(getCloudSDKFolder(), `install.${installScriptExtension}`);
    let args: string[];

    if (isWindows()) {
        args = ['/S', `/D=${getCloudSDKFolder()}`, '/singleuser', '/noreporting', '/nostartmenu', '/nodesktop'];
    } else {
        args = ['--path-update=false', '--usage-reporting=false', '--command-completion=false'];
    }

    try {
        const ls = readdirSync(getCloudSDKFolder());
        core.info(ls.join('\n'));
        await exec.exec(installScript, args);
    } catch (e) {
        core.error(e.message);
        process.exit(1);
    }

    const binPath = resolve(getCloudSDKFolder(), 'bin');
    core.addPath(binPath);
}
