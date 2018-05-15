exports._result = (game) => {
  if (!game.score) game.score = [null, null]
  return {
    blue: {
      score: game.score[0],
      outcome: game.result.replace(/loss/i, 'Defeat').replace(/win/i, 'Victory').replace(/draw/i, 'Draw').replace(/unknown/i, 'Unknown')
    },
    red: {
      score: game.score[1],
      outcome: game.result.replace(/loss/i, 'Victory').replace(/win/i, 'Defeat').replace(/draw/i, 'Draw').replace(/unknown/i, 'Unknown')
    }
  }
}
