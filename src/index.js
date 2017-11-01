const _api = require('./api')
const _detailed = require('./structures/detailed')
const _simple = require('./structures/simple')
const _lastMatch = require('./structures/lastMatch')
const { version } = require('../package')

// NOTE: Detailed will return a 404 if viewable is false

const ot = module.exports = {
  async player (key) {
    const res = await _api(`/games/${key}`)
    return res.games.map(game => Object.assign(_simple(game), {
      async detailed () {
        const json = await _api(game.url)
        return _detailed(json, game)
      }
    }))
  },
  async clientVersion () {
    const version = await _api('/client_version')
    return { message: version, number: version.slice(29) }
  },
  async sr (key, multipleAccounts = false) {
    const rank = await _api(`/sr/${key}?multiple_accounts=${multipleAccounts}`)
    return multipleAccounts
      ? rank.split(', ').map((x) => ({ name: /(^[^:]+)/.exec(x)[0], sr: /([0-9^ ]+$)/.exec(x)[0] }))
      : Number(rank)
  },
  async lastMatch (key) {
    const message = await _api(`/last_match/${key}`)
    const game = _lastMatch(message)
    return Object.assign(game, {
      async detailed () {
        const json = await _api(game.misc.json)
        return _detailed(json, game)
      }
    })
  },
  version
}

if (!module.parent) {
  if (process.argv.includes('--version') || process.argv.includes('-v')) console.log(version)
  if (process.argv.includes('--clientVersion')) ot.clientVersion().then(({ number }) => console.log(number)).catch(console.error)
}
