const heroStats = require('../const/heroStats')
const maps = require('../const/maps')

const _heroSpecific = (json, hero) => {
  const arr = []
  if (typeof json.hero_stat_1 === 'number') arr.push({ value: json.hero_stat_1, name: heroStats[hero][0] })
  if (typeof json.hero_stat_3 === 'number') arr.push({ value: json.hero_stat_3, name: heroStats[hero][2] })
  if (typeof json.hero_stat_5 === 'number') arr.push({ value: json.hero_stat_5, name: heroStats[hero][4] })
  if (typeof json.hero_stat_2 === 'number') arr.push({ value: json.hero_stat_2, name: heroStats[hero][1] })
  if (typeof json.hero_stat_4 === 'number') arr.push({ value: json.hero_stat_4, name: heroStats[hero][3] })
  if (typeof json.hero_stat_6 === 'number') arr.push({ value: json.hero_stat_6, name: heroStats[hero][5] })
  return arr
}

exports._heroStatistics = game => {
  const hero = game.hero_statistics
  const result = {}
  if (hero.ALL) {
    hero.all = hero.ALL
    delete hero.ALL
  }
  Object.keys(hero).forEach(key => {
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

exports._heroesPlayed = game => game.heroes_played.map(x => {
  return {
    hero: x[0],
    percent: x[1]
  }
}).sort((x, y) => y.percent - x.percent)

exports._killfeed = game => game.killfeed.map(x => {
  const resurrect = Boolean(x[1] & 2)
  const isLeftBlue = Boolean(x[1] & 1)
  if (resurrect) {
    return {
      left: { hero: x[2], player: x[3], team: isLeftBlue ? 'blue' : 'red' },
      resurrect,
      right: { hero: x[4], player: x[5], team: isLeftBlue ? 'blue' : 'red' },
      timestamp: x[0]
    }
  } else {
    return {
      assisters: x[6],
      killicon: x[7] ? { hero: x[7][0], ability: x[7][1] } : {},
      left: { hero: x[2], player: x[3], team: isLeftBlue ? 'blue' : 'red' },
      resurrect,
      right: { hero: x[4], player: x[5], team: isLeftBlue ? 'red' : 'blue' },
      timestamp: x[0]
    }
  }
}).sort((x, y) => x.timestamp - y.timestamp)

exports._map = game => {
  return {
    name: game.map,
    type: maps[game.map]
  }
}

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

// TODO: Write this function
exports._objectiveStages = game => {
  return game.objective_stages
}

exports._result = game => {
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

exports._season = game => { // Timezone: 'America/Los_Angeles' Format: 'dddd, MMMM D [at] h:mm a. z (Z)'
  const time = game.time || game.game_started
  // 1459965600 == Competitive Play Preview
  if (time < 1467154800) { // Tuesday, June 28 at 4:00 pm. PDT (-07:00)
    return { name: 'Competitive Play Preview', number: 0, offSeason: false }
  } else if (time < 1471478400) { // Wednesday, August 17 at 5:00 pm. PDT (-07:00)
    return { name: 'Season 1', number: 1, offSeason: false }
  } else if (time < 1472776680) { // Thursday, September 1 at 5:38 pm. PDT (-07:00)
    return { name: 'Off Season 1-2', number: 2, offSeason: true }
  } else if (time < 1479945600) { // Wednesday, November 23 at 4:00 pm. PST (-08:00)
    return { name: 'Season 2', number: 2, offSeason: false }
  } else if (time < 1480550400) { // Wednesday, November 30 at 4:00 pm. PST (-08:00)
    return { name: 'Off Season 2-3', number: 3, offSeason: true }
  } else if (time < 1487721600) { // Tuesday, February 21 at 4:00 pm. PST (-08:00)
    return { name: 'Season 3', number: 3, offSeason: false }
  } else if (time < 1488326400) { // Tuesday, February 28 at 4:00 pm. PST (-08:00)
    return { name: 'Off Season 3-4', number: 4, offSeason: true }
  } else if (time < 1496016000) { // Sunday, May 28 at 5:00 pm. PDT (-07:00)
    return { name: 'Season 4', number: 4, offSeason: false }
  } else if (time < 1496275200) { // Wednesday, May 31 at 5:00 pm. PDT (-07:00)
    return { name: 'Off Season 4-5', number: 5, offSeason: true }
  } else if (time < 1503964800) { // Monday, August 28 at 5:00 pm. PDT (-07:00)
    return { name: 'Season 5', number: 5, offSeason: false }
  } else if (time < 1504224000) { // Thursday, August 31 at 5:00 pm. PDT (-07:00)
    return { name: 'Off Season 5-6', number: 6, offSeason: true }
  } else if (time < 1509235200) { // Saturday, October 28 at 5:00 pm. PDT (-07:00)
    return { name: 'Season 6', number: 6, offSeason: false }
  } else if (time < 1509494400) { // Tuesday, October 31 at 5:00 pm. PDT (-07:00)
    return { name: 'Off Season 6-7', number: 7, offSeason: true }
  } else {
    return { name: 'Season 7', number: 7, offSeason: false }
  }
}

exports._sr = (game, simple) => {
  return {
    diff: game.end_sr - game.start_sr,
    end: game.end_sr,
    name: game.rank || (simple ? simple.rank : null),
    start: game.start_sr
  }
}

exports._teams = game => {
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

exports._time = game => {
  return {
    start: game.game_started || game.time,
    end: game.game_ended || null,
    length: game.game_duration || game.duration
  }
}
