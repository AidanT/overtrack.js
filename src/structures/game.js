const utils = require('../utils')

class Game extends Object {
  constructor (game, simple) {
    super()
    this.heroStatistics = utils._heroStatistics(game)
    this.heroesPlayed = utils._heroesPlayed(game)
    this.killfeed = utils._killfeed(game)
    this.map = utils._map(game)
    this.misc = utils._misc(game, simple)
    this.objectiveStages = utils._objectiveStages(game)
    this.result = utils._result(game)
    this.season = utils._season(game)
    this.sr = utils._sr(game, simple)
    this.time = utils._time(game)
    this.teams = utils._teams(game)
  }
}

module.exports = Game
