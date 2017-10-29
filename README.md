# OverTrack.js
[![npm](https://img.shields.io/npm/v/overtrack.js.svg)](https://www.npmjs.com/package/overtrack.js)
[![GitHub issues](https://img.shields.io/github/issues/aidant/overtrack.js.svg)](https://github.com/aidant/overtrack.js/issues)

### Installation
```shell
npm install --save overtrack.js
```

### Usage
```js
const ot = require('overtrack.js')

// latest client version
ot.version()
  .then(console.log)
  .catch(console.error)

// simple endpoint for getting current sr
ot.sr('eeveea')
  .then(sr => console.log('Current Skill Rating:', sr))
  .catch(console.error)

// main endpoint
ot.user('eeveea')
  .then(games => games[0].detailed())
  .then(game => console.log(game))
  .catch(console.error)
```

### Development
#### Linter
[JavaScript Standard Style](https://standardjs.com/#are-there-text-editor-plugins)
