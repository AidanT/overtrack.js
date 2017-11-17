const SimpleGame = require('./simpleGame')

class Games extends Array {
  constructor (games) {
    super()
    games.forEach((game) => this.push(new SimpleGame(game)))
  }

  average () {
    return { average: true }
  }
}

module.exports = Games
