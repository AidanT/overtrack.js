const GamePreview = require('./gamePreview')

/**
 * @typedef {GamePreview[]} Games - {@link #GamePreview}
 * @property {Object} average - Average stats of all games
 * @property {Object} average.sr
 * @property {Number} average.sr.start Average starting sr
 * @property {Number} average.sr.end Average sr
 * @property {Number} average.sr.diff Diffrence between `start` and `end` sr
 * @inner
*/

class Games extends Array {
  /** @private */
  constructor (games) {
    super()
    this.average = { sr: { start: 0, end: 0, games: 0 } }
    games.forEach((game, i) => {
      this[i] = new GamePreview(game)
      if (this[i].sr.start && this[i].sr.end) {
        this.average.sr.start += this[i].sr.start
        this.average.sr.end += this[i].sr.end
        this.average.sr.games ++
      }
    })
    this.average = {
      sr: {
        start: Math.round(this.average.sr.start / this.average.sr.games),
        end: Math.round(this.average.sr.end / this.average.sr.games)
      }
    }
    this.average.sr.diff = this.average.sr.end - this.average.sr.start
  }
}

module.exports = Games
