import rp from 'request-promise';

import * as util from './utils';
import config from './utils/constants';

export async function player(shareKey, options) {
  let ot = null;
  try { ot = await rp({ uri: `${config.api}games/${shareKey}`, json: true }); } catch (e) { return Promise.reject(e); }
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
    games: util.games(ot.games),
  };
};

export async function version() {
  let payload = null;
  try { payload = await rp({ uri: `${config.api}client_version` }); } catch (e) { return Promise.reject(e); }
  return payload.slice(29);
}
