const Game = require('./game')
const _api = require('../api')
const utils = require('../utils')

class SimpleGame extends Object {
  constructor (game) {
    super()
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

module.exports = SimpleGame
