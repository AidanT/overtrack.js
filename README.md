# OverTrack.js
[![npm](https://img.shields.io/npm/v/overtrack.js.svg)](https://www.npmjs.com/package/overtrack.js)
[![GitHub issues](https://img.shields.io/github/issues/aidant/overtrack.js.svg)](https://github.com/aidant/overtrack.js/issues)

### Installation
```shell
npm install --save overtrack.js
```
### Usage
```js
const OverTrack = require('overtrack.js')

OverTrack.stats('eeveea')
  .then(console.log)
  .catch(console.error)

OverTrack.version()
  .then(console.log)
  .catch(console.error)
```
