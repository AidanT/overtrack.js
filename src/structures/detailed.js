import * as utils from '../utils';

export default (game, simple) => {
  return {
    hero_statistics: utils._hero_statistics(game),
    heroes_played: utils._heroes_played(game),
    killfeed: utils._killfeed(game),
    map: utils._map(game),
    misc: utils._misc(game, simple),
    season: utils._season(game),
    result: utils._result(game),
    sr: utils._sr(game, simple),
    time: utils._time(game),
    teams: utils._teams(game)
  }
}
