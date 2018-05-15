exports._sr = (game, simple) => {
  const name = game.rank || (simple ? simple.rank : null)
  return {
    diff: name === 'placement' ? game.end_sr - game.start_sr : 0,
    end: game.end_sr || null,
    name,
    start: game.start_sr || null
  }
}
