import _api from './api'
import _detailed from './structures/detailed'
import _simple from './structures/simple'

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
    const v = await _api('/client_version')
    return { message: v, number: v.slice(29) }
  },
  async sr (key) {
    const rank = await _api(`/sr/${key}`)
    return Number(rank)
  }
}
