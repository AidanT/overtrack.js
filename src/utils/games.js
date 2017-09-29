import * as utils from './';
import _game from './game';

export default (arr) => arr.map(val => {
  return {
    async detailed() {
      const json = await utils._get(val.url, true);
      return _game(json, val.url);
    },
    heroes_played: utils._heroesPlayed(val.heroes_played),
    map: utils._map(val),
    misc: {
      custom_game: val.custom_game,
      key: val.key,
      user: val.owner,
      user_id: val.user_id,
      player: val.player_name,
      url: val.url,
      viewable: val.viewable
    },
    rank: val.rank,
    season: utils._season(val.time),
    sr: utils._sr(val),
    teams: utils._teams(val),
    time: utils._time(val.time, null, val.duration) // time.end is not correct.
  }
});
