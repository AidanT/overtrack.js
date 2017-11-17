const _api = require('./api')
// const _detailed = require('./structures/detailed')
// const _simple = require('./structures/simple')
// const SimpleGame = require('./structures/simpleGame')
const Game = require('./structures/game')
const Games = require('./structures/games')
const _lastMatch = require('./structures/lastMatch')
const { version } = require('../package')

// NOTE: Detailed will return a 404 if viewable is false

const ot = module.exports = {
  async player (key) {
    const { games } = await _api(`/games/${key}`)
    // return games.games.map(game => Object.assign(_simple(game), {
    //   async detailed () {
    //     const json = await _api(game.url)
    //     return _detailed(json, game)
    //   }
    // }))
    return new Games(games)
  },
  async clientVersion () {
    const message = await _api('/client_version')
    return { message, number: message.slice(29) }
  },
  async sr (key, { multipleAccounts } = { multipleAccounts: false }) {
    const rank = await _api(`/sr/${key}?multiple_accounts=${multipleAccounts}`)
    return multipleAccounts
      ? rank.split(', ')
        .map((x) => ({
          name: /(^[^:]+)/.exec(x)[0],
          sr: Number(/([0-9^ ]+$)/.exec(x)[0])
        }))
          .sort((x, y) => x.name > y.name)
      : Number(rank)
  },
  async lastMatch (key) {
    const message = await _api(`/last_match/${key}`)
    const game = _lastMatch(message)
    return Object.assign(game, {
      async detailed () {
        const json = await _api(game.misc.json)
        return new Game(json, game)
      }
    })
  },
  version
}

if (!module.parent) {
  if (process.argv.includes('--version') || process.argv.includes('-v')) {
    console.log(version)
  }
  if (process.argv.includes('--clientVersion')) {
    ot.clientVersion().then(({ number }) => console.log(number)).catch(console.error)
  }
  if (process.argv.includes('--sr')) {
    const key = process.argv[process.argv.indexOf('--sr') + 1]
    ot.sr(key, { multipleAccounts: true }).then(console.log).catch(console.error)
  }
  if (process.argv.includes('--player') && process.argv[process.argv.indexOf('--player') + 1]) {
    const player = process.argv[process.argv.indexOf('--player') + 1]
    ot.player(player).then(console.log).catch(console.error)
  }
}
