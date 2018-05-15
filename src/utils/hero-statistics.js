const { _heroSpecific } = require('./hero-specific')

exports._heroStatistics = (game) => {
  console.log(game)
  const hero = game.hero_statistics
  const result = {}
  if (hero.ALL) {
    hero.all = hero.ALL
    delete hero.ALL
  }
  Object.keys(hero).forEach((key) => {
    result[key] = {
      elims: hero[key].elims,
      damage: hero[key].damage,
      objectiveKills: hero[key].objective_kills,
      healing: hero[key].healing,
      objectiveTime: hero[key].objective_time,
      deaths: hero[key].deaths,
      tabHealth: hero[key].tab_health,
      timePlayed: hero[key].time_played,
      specific: _heroSpecific(hero[key], key)
    }
  })
  return result
}
