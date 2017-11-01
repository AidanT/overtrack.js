const _api = require('./api')
const _detailed = require('./structures/detailed')
const _simple = require('./structures/simple')
const _lastMatch = require('./structures/lastMatch')
const { version } = require('../package')

const ot = module.exports = {
  async player (key) {
    if (!key) throw new TypeError('Share Key is undefined.')
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
  async clientVersion () {
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
  },
  version
}

if (!module.parent) {
  if (process.argv.includes('--version') || process.argv.includes('-v')) console.log(version)
  if (process.argv.includes('--clientVersion')) ot.clientVersion().then(({ number }) => console.log(number)).catch(console.error)
}
