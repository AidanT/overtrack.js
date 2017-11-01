const utils = require('../utils')

module.exports = game => {
  return {
    heroesPlayed: utils._heroesPlayed(game),
    map: utils._map(game),
    misc: utils._misc(game),
    season: utils._season(game),
    result: utils._result(game),
    sr: utils._sr(game),
    time: utils._time(game)
  }
}
