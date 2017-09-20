import rp from 'request-promise';

const util = {
  games: games => {
    const result = [];
    for (let i = 0; i < games.length; i++) {
      result[i] = {
        custom_game: games[i].custom_game,
        duration: games[i].duration,
        key: games[i].key,
        map: games[i].map,
        result: games[i].result,
        player: games[i].player_name,
        rank: games[i].rank,
        sr: { start: games[i].start_sr, end: games[i].end_sr, diff: games[i].end_sr - games[i].start_sr },
        time: { start: games[i].time, length: games[i].duration },
        user_id: games[i].user_id,
        url: games[i].url,
      }
    }
    return result;
  },

}

const overTrack = async shareKey => {
  const ot = await rp({ uri: shareKey, json: true });
  return {
    game: async i => {
      const payload = await rp({ uri: ot.games[i].url, json: true })
      return {
        result: payload.result,
        sr: { start: payload.start_sr, end: payload.end_sr, diff: payload.end_sr - payload.start_sr },
        map: payload.map,
        duration: payload.game_duration,
        battleTag: payload.owner
      }
    },
    games: util.games(ot.games)
  }
};

export default overTrack;
