const utils = require('../utils')

module.exports = (game) => ({
  heroesPlayed: utils._heroesPlayed(game),
  map: utils._map(game),
  misc: utils._misc(game),
  result: utils._result(game),
  season: utils._season(game),
  sr: utils._sr(game),
  time: utils._time(game)
})
