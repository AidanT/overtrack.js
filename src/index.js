const _api = require('./api')
const Game = require('./structures/game')
const Games = require('./structures/games')
const _lastMatch = require('./structures/last-match')
const { version } = require('../package')

// NOTE: Detailed will return a 404 if viewable is false

const ot = module.exports = async (key) => {
  const { games } = await _api(`/games/${key}`)
  return new Games(games)
}

ot.version = version

ot.clientVersion = async () => {
  const message = await _api('/client_version')
  return { message, number: message.slice(29) }
}

ot.sr = async (key, { multipleAccounts } = { multipleAccounts: false }) => {
  const rank = await _api(`/sr/${key}?multiple_accounts=${multipleAccounts}`)
  if (multipleAccounts) {
    const ranks = rank.split(',')
      .map((x) => ({
        name: /(^[^:]+)/.exec(x)[0],
        sr: Number(/([0-9^ ]+$)/.exec(x)[0])
      }))
    return ranks
  } else {
    return Number(rank)
  }
}

ot.lastMatch = async (key) => {
  const message = await _api(`/last_match/${key}`)
  const game = _lastMatch(message)
  return Object.assign(game, {
    async detailed () {
      const json = await _api(game.misc.json)
      return new Game(json, game)
    }
  })
}

if (!module.parent) {
  const vm = require('vm')
  const context = {}
  Object.defineProperties(context, {
    ot: {
      value: ot,
      enumerable: true
    },
    global: {
      value: context
    }
  })
  vm.createContext(context)
  process.stdin.resume()
  const prompt = () => process.stdout.write('> ')
  process.stdin.on('data', (data) => {
    data = data.toString('utf8')
    try {
      const result = vm.runInContext(data, context)
      if (result instanceof Promise) {
        result
          .then(console.log, console.error)
          .then(prompt)
      } else {
        console.log(result)
        prompt()
      }
    } catch (error) {
      console.error(error)
      prompt()
    }
  })
  prompt()
}
