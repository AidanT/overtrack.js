# OverTrack.js
[![npm](https://img.shields.io/npm/v/overtrack.js.svg)](https://www.npmjs.com/package/overtrack.js)
[![GitHub issues](https://img.shields.io/github/issues/aidant/overtrack.js.svg)](https://github.com/aidant/overtrack.js/issues)
### Installing
###### NOTE
Node 8.x is required
```shell
npm install --save overtrack.js
```

### Example
```js
const ot = require('overtrack.js')

ot.player('eeveea')
  .then((games) => console.log(games))
  .catch(console.error)

```

<hr>

###### NOTE
I plan on writing better docs before release.
## Methods
###### NOTE
<!-- **All methods return Promises** -->

[ot.player(key)](#otplayerkey)<br>
[ot.sr(key[, options])](#otsrkey-options)<br>
[ot.clientVersion()](#otclientversion)<br>
[ot.lastMatch(key)](#otlastmatchkey)<br>

<hr>

### `player(key)`
##### Returns: [Simple game object.](#simple)
##### Example:
```js
ot.player('eeveea')
  .then((games) => {
    const game = games[0]
    console.log('Simple game object:', game)
    return game.detailed()
  })
  .then((game) => console.log('Detailed game object:', game))
  .catch(console.error)
```

<hr>

### `sr(key[, options])`
##### `options`
* **multipleAccounts:** `Boolean` Default: `false`

##### Returns: `Number` or `Array`
```js
  [
    { name: String, sr: Number },
    {...}
  ]
```
##### Example:
```js
ot.sr('eeveea')
  .then((sr) => console.log(sr))
  .catch(console.error)

ot.sr('eeveea', { multipleAccounts: true })
  .then((accounts) => {
    const message = accounts
      .map((x) => `${x.name}: ${x.sr}`)
      .join('\n')
    console.log(message)
  })
  .catch(console.error)
```

<hr>

### `ot.clientVersion()`
##### Returns: `Object`
```js
{
  message: String,
  number: String
}
```
##### Example:
```js
ot.clientVersion()
  .then((version) => console.log(version.message))
  .catch(console.error)
```

<hr>

### `ot.lastMatch(key)`
###### NOTE
Some fields may be null.
##### ~~Returns: [Simple game object.](#simple)~~
##### Example:
```js
ot.lastMatch('eeveea')
  .then((game) => {
    console.log('Last match:', game)
    return game.detailed()
  })
  .then((game) => console.log('Detailed game object:', game))
  .catch(console.error)
```

<hr>

## Objects

### `simple`

* `detailed`
 * Function, Returns: Promise<[Detailed game object](#detailed)>
* [`heroesPlayed`](#heroesplayed)
* [`map`](#map)
* [`misc`](#misc)
* [`result`](#result)
* [`season`](#season)
* [`sr`](#sr)
* [`time`](#time)

### `detailed`

* [`heroStatistics`](#herostatistics)
* [`heroesPlayed`](#heroesplayed)
* [`killfeed`](#killfeed)
* [`map`](#map)
* [`misc`](#misc)
* [`objectiveStages`](#objectivestages)
* [`result`](#result)
* [`season`](#season)
* [`sr`](#sr)
* [`time`](#time)
* [`teams`](#teams)

<hr>

### `heroStatistics`
```js
{
  elims: Number,
  damage: Number,
  objectiveKills: Number,
  healing: Number,
  objectiveTime: Number,
  deaths: Number,
  tabHealth: Number,
  timePlayed: Number,
  specific: [
    { value: Number, name: String },
    {...}
  ]
}
```

<hr>

### `heroesPlayed`
```js
[
  { hero: String, percent: Number },
  {...}
]
```

<hr>

### `killfeed`
###### NOTE
There are two different types of objects in the array kills, and resurrects.
```js
  [
    {
      left: {
        hero: String,
        player: String,
        team: 'blue' || 'red'
      },
      resurrect: true,
      right: {
        hero: String,
        player: String,
        team: 'blue' || 'red'
      },
      timestamp: Number
    },
    {
      assisters: [
        String
      ],
      killicon: {
        hero: String,
        ability: String
      },
      left: {
        hero: String,
        player: String,
        team: 'blue' || 'red'
      },
      resurrect: false,
      right: {
        hero: String,
        player: String,
        team: 'blue' || 'red'
      },
      timestamp: Number
    },
    {...}
  ]
```

<hr>

### `map`
```js
{
  name: String,
  type: String
}
```

<hr>

### `misc`
```js
  customGame: Boolean || null,
  key: String || null,
  url: String|| null,
  userId: Number || null,
  user: String || null,
  player: String || null,
  json: String || null,
  viewable: Boolean || null
```

<hr>

### `objectiveStages`
###### **This has not been parsed yet and is the raw info form overtarck api**

<hr>

### `result`
```js
{
  blue: {
    score: Number,
    outcome: String
  },
  red: {
    score: Number,
    outcome: String
  }
}
```

<hr>

### `season`
```js
{
  name: String,
  number: Number,
  offSeason: Boolean
}
```

<hr>

## `sr`
```js
{
  diff: Number,
  end: Number || null,
  name: String,
  start: Number || null
}
```

<hr>

### `teams`
```js
{
  blue: {
    sr: Number,
    players: [
      { name: String, rank: String },
      {...}
    ]
  },
  red: {
    sr: Number,
    players: [
      { name: String, rank: String },
      {...}
    ]
  }
}
```

<hr>

### `time`
```js
{
  start: Number,
  end: Number || null,
  length: Number
}
```

<hr>

## Development
Pull requests are welcome.
#### Linter
[JavaScript Standard Style](https://standardjs.com/#are-there-text-editor-plugins)
