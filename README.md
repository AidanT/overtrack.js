# OverTrack.js
[![npm](https://img.shields.io/npm/v/overtrack.js.svg)](https://www.npmjs.com/package/overtrack.js)
[![GitHub issues](https://img.shields.io/github/issues/aidant/overtrack.js.svg)](https://github.com/aidant/overtrack.js/issues)

### Installation
##### Node 8.x is required
```shell
npm install --save overtrack.js
```

### Usage
```js
const ot = require('overtrack.js')

ot.clientVersion()
  .then(console.log)
  .catch(console.error)

ot.sr('eeveea')
  .then(sr => console.log('Current Skill Rating:', sr))
  .catch(console.error)

ot.player('eeveea')
  .then(games => {
    console.log(games[0])
    return games[0].detailed()
  })
  .then(game => console.log(game))
  .catch(console.error)

ot.lastMatch('eeveea')
  .then(game => {
    console.log(game)
    return game.detailed()
  })
  .then(game => console.log(game))
  .catch(console.error)
```

### Development
#### Linter
[JavaScript Standard Style](https://standardjs.com/#are-there-text-editor-plugins)
