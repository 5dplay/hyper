// Packages
import electron from 'electron';
const {app} = electron;
import ms from 'ms';
import retry from 'async-retry';

// Utilities
import {version} from './package';
import {getDecoratedConfig} from './plugins';

const {platform} = process;
const isLinux = platform === 'linux';

const autoUpdater = isLinux ? require('./auto-updater-linux').default : electron.autoUpdater;

let isInit = false;
// Default to the "stable" update channel
let canaryUpdates = false;

const buildFeedUrl = (canary, currentVersion) => {
  const updatePrefix = canary ? 'releases-canary' : 'releases';
  return `https://${updatePrefix}.hyper.is/update/${isLinux ? 'deb' : platform}/${currentVersion}`;
};

const isCanary = updateChannel => updateChannel === 'canary';

async function init() {
  autoUpdater.on('error', (err, msg) => {
    console.error('Error fetching updates', `${msg} (${err.stack})`);
  });

  const config = await retry(async () => {
    const content = await getDecoratedConfig();

    if (!content) {
      throw new Error('No config content loaded');
    }

    return content;
  });

  // If defined in the config, switch to the "canary" channel
  if (config.updateChannel && isCanary(config.updateChannel)) {
    canaryUpdates = true;
  }

  const feedURL = buildFeedUrl(canaryUpdates, version);

  autoUpdater.setFeedURL(feedURL);

  setTimeout(() => {
    autoUpdater.checkForUpdates();
  }, ms('10s'));

  setInterval(() => {
    autoUpdater.checkForUpdates();
  }, ms('30m'));

  isInit = true;
}

export default win => {
  if (!isInit) {
    init();
  }

  const {rpc} = win;

  const onupdate = (ev, releaseNotes, releaseName, date, updateUrl, onQuitAndInstall) => {
    const releaseUrl = updateUrl || `https://github.com/zeit/hyper/releases/tag/${releaseName}`;
    rpc.emit('update available', {releaseNotes, releaseName, releaseUrl, canInstall: !!onQuitAndInstall});
  };

  const eventName = isLinux ? 'update-available' : 'update-downloaded';

  autoUpdater.on(eventName, onupdate);

  rpc.once('quit and install', () => {
    autoUpdater.quitAndInstall();
  });

  app.config.subscribe(() => {
    const {updateChannel} = app.plugins.getDecoratedConfig();
    const newUpdateIsCanary = isCanary(updateChannel);

    if (newUpdateIsCanary !== canaryUpdates) {
      const feedURL = buildFeedUrl(newUpdateIsCanary, version);

      autoUpdater.setFeedURL(feedURL);
      autoUpdater.checkForUpdates();

      canaryUpdates = newUpdateIsCanary;
    }
  });

  win.on('close', () => {
    autoUpdater.removeListener(eventName, onupdate);
  });
};
