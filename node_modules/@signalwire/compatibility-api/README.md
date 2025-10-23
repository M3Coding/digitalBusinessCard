# SignalWire Compatibility SDK

[![Build Status](https://ci.signalwire.com/api/badges/signalwire/signalwire-js/status.svg)](https://ci.signalwire.com/signalwire/signalwire-js) ![NPM](https://img.shields.io/npm/v/@signalwire/compatibility-api-js.svg?color=brightgreen)

The SignalWire Compatibility SDK is designed to make migrating your existing phone or messaging application easy and quick, while giving you access to our next generation APIs and endpoints to help you take your application to the next level.

## Getting Started

Read the implementation documentation, guides and API Reference at the official [SignalWire Compatibility SDK Documentation](https://docs.signalwire.com/reference/compatibility-sdks/?javascript) site.

---

## Node.js Version Support

As of version 3.2.0, this library requires Node.js 16 or higher. Support for Node.js 14 (which reached end-of-life in April 2023) has been dropped.

### Using with Node.js 14

If you need to use this library with Node.js 14, you have two options:

**Option 1: Install the last compatible version (recommended)**

```bash
npm install @signalwire/compatibility-api@3.1.4
```

**Option 2: Override dependencies (advanced, not recommended)**

If you absolutely must use the latest version with Node.js 14, you can attempt to override the engine check and axios version, though this is not tested or supported:

```json
{
  "dependencies": {
    "@signalwire/compatibility-api": "^3.2.0"
  },
  "overrides": {
    "@signalwire/compatibility-api": {
      "axios": "^1.6.2"
    }
  },
  "engines": {
    "node": ">=14"
  }
}
```

**Note:** This override approach may result in security vulnerabilities or unexpected behavior. We strongly recommend upgrading to Node.js 16 or higher.

---

## Contributing

SignalWire Compatibility SDK is open source and maintained by the SignalWire team, but we are very grateful for [everyone](https://github.com/signalwire/compatibility-api-js/contributors) who has contributed and assisted so far.

If you'd like to contribute, feel free to visit our [Slack channel](https://signalwire.community/) and read our developer section to get the code running in your local environment.

## Developers

The Compatibility SDK is a package inside the [compatibility-api-js](https://github.com/signalwire/compatibility-api-js) repository. To setup the dev environment follow these steps:

1. [Download the installer](https://nodejs.org/) for the LTS version of Node.js. This is the best way to also [install npm](https://blog.npmjs.org/post/85484771375/how-to-install-npm#_=_).
2. Fork the [compatibility-api-js](https://github.com/signalwire/compatibility-api-js) repository and clone it.
3. Create a new branch from `main` for your change.
4. Run `npm install` to install global dependencies.
6. Make changes!

## Versioning

SignalWire Compatibility SDK follows Semantic Versioning 2.0 as defined at <http://semver.org>.

## License

`@signalwire/compatibility-api-js` is copyright © 2018-2023 [SignalWire](http://signalwire.com). It is free software, and may be redistributed under the terms specified in the [MIT-LICENSE](https://github.com/signalwire/compatibility-api-js/blob/main/LICENSE) file.
