exports._teams = (game) => {
  return {
    blue: {
      sr: game.avg_sr[0],
      players: game.teams.blue
    },
    red: {
      sr: game.avg_sr[1],
      players: game.teams.red
    }
  }
}
