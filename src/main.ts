import onError from './lib/on-error';
import auth from './tasks/auth';
import configureDocker from './tasks/configure-docker';
import download from './tasks/download';
import install from './tasks/install';

async function main(): Promise<void> {
  const installDir = await download();

  if (installDir) {
    await install(installDir);
  }

  await auth();
  await configureDocker();
}

main().catch(onError);
