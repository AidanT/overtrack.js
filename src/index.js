import _api from './api'
import _detailed from './structures/detailed'
import _simple from './structures/simple'
import _lastMatch from './structures/lastMatch'

export default {
  async user (key) {
    const res = await _api(`/games/${key}`)
    return res.games.map(game => {
      if (game.viewable) {
        return Object.assign(_simple(game), {
          async detailed () {
            const json = await _api(game.url)
            return _detailed(json, game)
          }
        })
      } else {
        return _simple(game)
      }
    })
  },
  async version () {
    const version = await _api('/client_version')
    return { message: version, number: version.slice(29) }
  },
  async sr (key) {
    const rank = await _api(`/sr/${key}`)
    return Number(rank)
  },
  async lastMatch (key) {
    const x = await _api(`/last_match/${key}`)
    return _lastMatch(x)
  }
}
