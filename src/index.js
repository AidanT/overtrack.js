const _api = require('./api')
// const _detailed = require('./structures/detailed')
// const _simple = require('./structures/simple')
// const SimpleGame = require('./structures/simpleGame')
const Game = require('./structures/game')
const Games = require('./structures/games')
const _lastMatch = require('./structures/lastMatch')
const { version } = require('../package')

// NOTE: Detailed will return a 404 if viewable is false

/**
 * @async
 * @function ot
 * @param {String} key - OverTrack share key
 * @returns {Promise<Games>} - {@link #Games}
 * @inner
 */
const ot = module.exports = async (key) => {
  const { games } = await _api(`/games/${key}`)
  return new Games(games)
}

/**
 * @property {String} version - Current package version
 */
ot.version = version

/**
 * @async
 * @method ot.clientVersion
 * @returns {Promise<ot.clientVersion~version>}
 * {@link #ot.clientVersion~version}
 */

 /**
  * Returned by {@link #ot.clientVersion}
  * @typedef ot.clientVersion~version
  * @type {Object}
  * @property {String} message - Unparsed String from OverTrack
  * @property {String} number - Current client verstion of the OverTrack desktop app
  *
 */
ot.clientVersion = async () => {
  const message = await _api('/client_version')
  return { message, number: message.slice(29) }
}

/**
 * Get the players last seen sr
 * @async
 * @method ot.sr
 * @param {String} key - OverTrack share key
 * @param {Object} [options = Object]
 * @param {Boolean} [options.multipleAccounts = true]
 * @returns {Promise<(ot.sr~ranks|Number|String)>}
 * If `multipleAccounts` is `true` it returns {@link #ot.sr~ranks} otherwise a Number/String is returned
 */

/**
 * Returned by {@link #ot.sr}
 * @typedef ot.sr~ranks
 * @type {Object[]}
 * @property {String} name - Account name
 * @property {Number|String} sr - Sr of the account (sometimes a String e.g `placements`)
 *
*/
ot.sr = async (key, { multipleAccounts = true } = { multipleAccounts: true }) => {
  const rank = await _api(`/sr/${key}?multiple_accounts=${multipleAccounts}`)
  if (multipleAccounts) {
    return rank
      .split(',')
      .map((x) => {
        const sr = x.match(/[^ ]+$/)[0].trim()
        return {
          name: x.match(/^[^:]+/)[0].trim(),
          sr: /^[0-9]+$/.test(sr) ? Number(sr) : sr
        }
      })
  } else {
    return /^[0-9]+$/.test(rank) ? Number(rank) : rank
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
    ot(player).then(console.log).catch(console.error)
  }
  if (process.argv.includes('--lastMatch') && process.argv[process.argv.indexOf('--lastMatch') + 1]) {
    const player = process.argv[process.argv.indexOf('--lastMatch') + 1]
    ot.lastMatch(player).then(console.log).catch(console.error)
  }
}
