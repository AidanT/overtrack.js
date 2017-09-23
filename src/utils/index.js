import { _mapToType } from '../constants';

const _heroesPlayed = arr => {
  const result = [];
  for (var i = 0; i < arr.length; i++) {
    result[i] = { hero: arr[i][0], percent: arr[i][1] }
  }
  return result;
};

const _time = (start, end, length) => {
  if (!end) end = start + length;
  return { start, end, length }
}

const _score = arr => { return { blue: arr[0], red: arr[1] } };
const _sr = json => { return { start: json.start_sr, end: json.end_sr, diff: json.end_sr - json.start_sr } };
const _map = json => { return { name: json.map, type: json.map_type || _mapToType(json.map) } };

export function games(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    result[i] = {
      custom_game: arr[i].custom_game,
      duration: arr[i].duration,
      key: arr[i].key,
      map: _map(arr[i]),
      result: arr[i].result,
      player: arr[i].player_name,
      rank: arr[i].rank,
      sr: _sr(arr[i]),
      time: _time(arr[i].time, null, arr[i].duration),
      user_id: arr[i].user_id,
      url: arr[i].url,
      heroes_played: _heroesPlayed(arr[i].heroes_played),
      score: _score(arr[i].score)
    }
  }
  return result;
}

export function game(json) {
  return {
    key: json.key,
    result: json.result,
    sr: _sr(json),
    map: _map(json),
    duration: json.game_duration,
    battleTag: json.owner,
    user_id: json.user_id,
    player: json.player,
    custom_game: json.custom_game,
    group_size: json.group_size,
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
    heroes_played: _heroesPlayed(json.heroes_played),
    score: _score(json.score),
    time: _time(json.game_started, json.game_ended, json.game_duration)

  }
}
