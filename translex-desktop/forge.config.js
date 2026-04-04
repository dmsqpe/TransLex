const fs = require('fs');
const path = require('path');
const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');

const iconBasePath = path.resolve(__dirname, 'assets', 'translex-icon');
const iconPngPath = `${iconBasePath}.png`;
const iconIcoPath = `${iconBasePath}.ico`;
const iconIcnsPath = `${iconBasePath}.icns`;
const packagerIcon =
  process.platform === 'darwin'
    ? (fs.existsSync(iconIcnsPath) ? iconBasePath : undefined)
    : (fs.existsSync(iconIcoPath) ? iconBasePath : undefined);

module.exports = {
  packagerConfig: {
    asar: true,
    icon: packagerIcon,
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: fs.existsSync(iconIcoPath)
        ? {
            setupIcon: iconIcoPath,
          }
        : {},
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: fs.existsSync(iconPngPath)
        ? {
            options: {
              icon: iconPngPath,
            },
          }
        : {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: fs.existsSync(iconPngPath)
        ? {
            options: {
              icon: iconPngPath,
            },
          }
        : {},
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};
