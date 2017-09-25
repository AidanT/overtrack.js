import { _mapToType } from '../const';

// shared functions

const _heroesPlayed = arr => arr.map(val => { return { hero: val[0], percent: val[1] } });
const _map = json => { return { name: json.map, type: json.map_type || _mapToType(json.map) } };
const _result = result => result.replace(/loss/i, 'defeat').replace(/win/i, 'victory').replace(/draw/i, 'draw');
const _score = arr => { return { blue: arr[0], red: arr[1] } };
const _sr = json => { return { start: json.start_sr, end: json.end_sr, diff: json.end_sr - json.start_sr } };
const _time = (start, end, length) => { return { start, end: end || start + length, length } };

// killfeed

const _killicon = killicon => {
  if (!killicon) return null;
  return { hero: killicon[0], ability: killicon[1] }
};

const _killfeed = json => json.killfeed.map(val => {
  const resurrect = Boolean(val[1] & 2);
  const is_left_blue = Boolean(val[1] & 1);
  if (resurrect)
    return {
      resurrect,
      timestamp: val[0],
      left: { hero: val[2], player: val[3], team: is_left_blue ? 'blue' : 'red' },
      right: { hero: val[4], player: val[5], team: is_left_blue ? 'blue' : 'red' }
    };
  else
    return {
      resurrect,
      timestamp: val[0],
      left: { hero: val[2], player: val[3], team: is_left_blue ? 'blue' : 'red' },
      right: { hero: val[4], player: val[5], team: is_left_blue ? 'red' : 'blue' },
      assisters: val[6],
      killicon: val[7] ? { hero: val[7][0], ability: val[7][1] } : null,
    };
});

// tab_statistics

const _tab_statistics = val => {
  const result = [];
  for (var i = 0; i < val.hero.length; i++) {
    result[i] = {
      hero: val.hero[i],
      time: val.time[i],
      damage: val.damage[i],
      objective_kills: val.objective_kills[i],
      healing: val.healing[i],
      objective_time: val.objective_time[i],
      deaths: val.deaths[i],
      hero_stat_1: val.hero_stat_1[i],
      hero_stat_2: val.hero_stat_2[i],
      hero_stat_3: val.hero_stat_3[i],
      hero_stat_4: val.hero_stat_4[i],
      hero_stat_5: val.hero_stat_5[i],
      hero_stat_6: val.hero_stat_6[i]
    }
  }
  return result;
};

// methods

export const _games = arr => arr.map(val => {
  return {
    custom_game: val.custom_game,
    heroes_played: _heroesPlayed(val.heroes_played),
    key: val.key,
    map: _map(val),
    player: val.player_name,
    result: _result(val.result),
    rank: val.rank,
    score: _score(val.score),
    sr: _sr(val),
    time: _time(val.time, null, val.duration), // time.end is not correct.
    user_id: val.user_id,
    url: val.url
  };
});

export const _game = json => {
  return {
    battleTag: json.owner,
    custom_game: json.custom_game,
    group_size: json.group_size,
    heroes_played: _heroesPlayed(json.heroes_played),
    key: json.key,
    killfeed: _killfeed(json),
    map: _map(json),
    player: json.player,
    result: _result(json.result),
    rank: json.teams.blue[0].rank,
    score: _score(json.score),
    sr: _sr(json),
    tab_statistics: _tab_statistics(json.tab_statistics),
    teams: {
      blue: {
        average_sr: json.avg_sr[0],
        players: json.teams.blue
      },
      red: {
        average_sr: json.avg_sr[1],
        players: json.teams.red
      }
    },
    time: _time(json.game_started, json.game_ended, json.game_duration),
    user_id: json.user_id
  }
}
