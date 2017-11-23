const Game = require('./game')
const _api = require('../api')
const utils = require('../utils')

class GamePreview {
  constructor (game) {
    this.heroesPlayed = utils._heroesPlayed(game)
    this.map = utils._map(game)
    this.misc = utils._misc(game)
    this.result = utils._result(game)
    this.season = utils._season(game)
    this.sr = utils._sr(game)
    this.time = utils._time(game)
  }

  async detailed () {
    const game = await _api(this.misc.json)
    return new Game(game, this)
  }
}

// const GamePreview = function (game) {
//   Object.defineProperties(this, {
//     heroesPlayed: {
//       value: utils._heroesPlayed(game),
//       enumerable: true
//     },
//     map: {
//       value: utils._map(game),
//       enumerable: true
//     },
//     misc: {
//       value: utils._misc(game),
//       enumerable: true
//     },
//     result: {
//       value: utils._result(game),
//       enumerable: true
//     },
//     season: {
//       value: utils._season(game),
//       enumerable: true
//     },
//     sr: {
//       value: utils._sr(game),
//       enumerable: true
//     },
//     time: {
//       value: utils._time(game),
//       enumerable: true
//     }
//   })
// }
//
// Object.defineProperties(GamePreview.prototype, {
//   detailed: {
//     value: async () => {
//       const game = await _api(GamePreview.misc.json)
//       return new Game(game, GamePreview)
//     }
//   }
// })

module.exports = GamePreview
