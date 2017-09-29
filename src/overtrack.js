import * as utils from './utils'
import _games from './utils/games';

export default {
  async stats(key) {
    const json = await utils._get(`/games/${key}`);
    return _games(json.games);
  },
  async version() {
    const v = await utils._get('/client_version')
    return v.slice(29);
  }
}
