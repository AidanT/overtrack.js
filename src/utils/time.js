exports._time = (game) => {
  return {
    start: game.game_started || game.time,
    end: game.game_ended || null,
    length: game.game_duration || game.duration
  }
}
