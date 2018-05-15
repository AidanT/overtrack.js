exports._misc = (game, simple) => {
  return {
    customGame: game.custom_game !== undefined ? game.custom_game : null,
    key: game.key || null,
    url: game.key ? `https://overtrack.gg/game/${game.key}` : null,
    userId: game.user_id || null,
    user: game.owner || game.key ? game.key.split('/')[0].replace('-', '#') : null,
    player: game.player || game.player_name || null,
    json: game.url || simple.url || null,
    viewable: game.viewable !== undefined ? game.viewable : null
  }
}
