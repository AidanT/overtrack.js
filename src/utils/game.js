import * as utils from './';

export default (json, url) => {
  return {
    group_size: json.group_size,
    hero_statistics: utils._hero_statistics(json.hero_statistics),
    heroes_played: utils._heroesPlayed(json.heroes_played),
    map: utils._map(json),
    misc: {
      battle_tag: json.owner,
      custom_game: json.custom_game,
      key: json.key,
      user: json.owner,
      user_id: json.user_id,
      player: json.player_name,
      url: url,
      viewable: json.viewable
    },
    rank: json.rank,
    season: utils._season(json.time),
    sr: utils._sr(json),
    teams: utils._teams(json),
    time: utils._time(json.game_started, json.game_ended, json.game_duration)
  }
}
