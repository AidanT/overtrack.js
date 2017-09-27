import rp from 'request-promise';

import * as util from './utils';
import config from './const';

const player = async (shareKey, options) => {
  let overTrack = null;
  try { overTrack = await rp({ uri: `${config.api}games/${shareKey}`, json: true }); } catch (e) { return Promise.reject(e); }
  return {
    game: async i => {
      let json = null;
      try { json = await rp({ uri: overTrack.games[i].url, json: true }); } catch (e) { return Promise.reject(e); }
      return util._game(json);
    },
    games: util._games(overTrack.games),
  };
};

const version = async () => {
  let payload = null;
  try { payload = await rp({ uri: `${config.api}client_version` }); } catch (e) { return Promise.reject(e); }
  return payload.slice(29);
}

const game = async url => {
  let json = null;
  try { json = await rp({ uri: url, json: true }); } catch (e) { return Promise.reject(e); }
  return util._game(json);
}

export default {
  player,
  version,
  game
}
