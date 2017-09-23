export function games(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    result[i] = {
      custom_game: arr[i].custom_game,
      duration: arr[i].duration,
      key: arr[i].key,
      map: arr[i].map,
      result: arr[i].result,
      player: arr[i].player_name,
      rank: arr[i].rank,
      sr: { start: arr[i].start_sr, end: arr[i].end_sr, diff: arr[i].end_sr - arr[i].start_sr },
      time: { start: arr[i].time, length: arr[i].duration },
      user_id: arr[i].user_id,
      url: arr[i].url,
      heroes_played: heroesPlayed(arr[i].heroes_played),
      score: { blue: arr[i].score[0], red: arr[i].score[1]}
    }
  }
  return result;
}

function heroesPlayed(arr) {
  const result = [];
  for (var i = 0; i < arr.length; i++) {
    result[i] = { hero: arr[i][0], percent: arr[i][1] }
  }
  return result;
}
