exports._heroesPlayed = (game) => game.heroes_played
  .map(([hero, percent]) => ({ hero, percent }))
  .sort((x, y) => y.percent - x.percent)
