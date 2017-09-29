import * as utils from '../utils';

export default game => {
  return {
    heroes_played: utils._heroes_played(game),
    map: utils._map(game),
    misc: utils._misc(game),
    season: utils._season(game),
    result: utils._result(game),
    sr: utils._sr(game),
    time: utils._time(game)
  }
}
