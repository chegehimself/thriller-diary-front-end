// https://www.npmjs.com/package/jest-fetch-mock#installation-and-setup

window.confirm = (msg) => { return true };

global.fetch = require('jest-fetch-mock');
