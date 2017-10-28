import heroStats from '../const/heroStats';
import maps from '../const/maps';

export const _hero_specific = (json, hero) => {
  const arr = [];
  if (typeof json.hero_stat_1 == 'number') arr.push({ value: json.hero_stat_1, name: heroStats[hero][0] });
  if (typeof json.hero_stat_3 == 'number') arr.push({ value: json.hero_stat_3, name: heroStats[hero][2] });
  if (typeof json.hero_stat_5 == 'number') arr.push({ value: json.hero_stat_5, name: heroStats[hero][4] });
  if (typeof json.hero_stat_2 == 'number') arr.push({ value: json.hero_stat_2, name: heroStats[hero][1] });
  if (typeof json.hero_stat_4 == 'number') arr.push({ value: json.hero_stat_4, name: heroStats[hero][3] });
  if (typeof json.hero_stat_6 == 'number') arr.push({ value: json.hero_stat_6, name: heroStats[hero][5] });
  return arr;
}

export const _hero_statistics = game => {
  const hero = game.hero_statistics;
  const result = {};
  if (hero.ALL) {
    hero.all = hero.ALL;
    delete hero.ALL;
  }
  Object.keys(hero).forEach(key => {
    result[key] = {
      elims: hero[key].elims,
      damage: hero[key].damage,
      objective_kills: hero[key].objective_kills,
      healing: hero[key].healing,
      objective_time: hero[key].objective_time,
      deaths: hero[key].deaths,
      tab_health: hero[key].tab_health,
      time_played: hero[key].time_played,
      specific: _hero_specific(hero[key], key)
    }
  })
  return result;
};

export const _heroes_played = game => game.heroes_played.map(x => {
  return {
    hero: x[0],
    percent: x[1]
  }
}).sort((x, y) => y.percent - x.percent)

export const _killfeed = game => game.killfeed.map(x => {
  const resurrect = Boolean(x[1] & 2);
  const is_left_blue = Boolean(x[1] & 1);
  if (resurrect) {
    return {
      left: { hero: x[2], player: x[3], team: is_left_blue ? 'blue' : 'red' },
      resurrect,
      right: { hero: x[4], player: x[5], team: is_left_blue ? 'blue' : 'red' },
      timestamp: x[0]
    }
  } else {
    return {
      assisters: x[6],
      killicon: x[7] ? { hero: x[7][0], ability: x[7][1] } : {},
      left: { hero: x[2], player: x[3], team: is_left_blue ? 'blue' : 'red' },
      resurrect,
      right: { hero: x[4], player: x[5], team: is_left_blue ? 'red' : 'blue' },
      timestamp: x[0]
    }
  }
}).sort((x, y) => x.timestamp - y.timestamp)

export const _map = game => {
  return {
    name: game.map,
    type: maps[game.map]
  }
}

export const _misc = (game, simple) => {
  return {
    custom_game: game.custom_game,
    key: game.key,
    url: `https://overtrack.gg/game/${game.key}`,
    user_id: game.user_id,
    user: game.owner || game.key.split('/')[0].replace('-', '#'),
    player: game.player || game.player_name,
    json: game.url || simple.url,
    viewable: game.viewable
  }
}

export const _result = game => {
  if (!game.score) game.score = [null, null];
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

export const _season = game => { // Timezone: 'America/Los_Angeles' Format: 'dddd, MMMM D [at] h:mm a. z (Z)'
const time = game.time;
  if (time < 1467154800) // Tuesday, June 28 at 4:00 pm. PDT (-07:00)
    return { name: 'Competitive Play Preview', number: 0, off_season: false }
  else if (time < 1471478400) // Wednesday, August 17 at 5:00 pm. PDT (-07:00)
    return { name: 'Season 1', number: 1, off_season: false }
  else if (time < 1472776680) // Thursday, September 1 at 5:38 pm. PDT (-07:00)
    return { name: 'Off Season 1-2', number: 2, off_season: true }
  else if (time < 1479945600) // Wednesday, November 23 at 4:00 pm. PST (-08:00)
    return { name: 'Season 2', number: 2, off_season: false }
  else if (time < 1480550400) // Wednesday, November 30 at 4:00 pm. PST (-08:00)
    return { name: 'Off Season 2-3', number: 3, off_season: true }
  else if (time < 1487721600) // Tuesday, February 21 at 4:00 pm. PST (-08:00)
    return { name: 'Season 3', number: 3, off_season: false }
  else if (time < 1488326400) // Tuesday, February 28 at 4:00 pm. PST (-08:00)
    return { name: 'Off Season 3-4', number: 4, off_season: true }
  else if (time < 1496016000) // Sunday, May 28 at 5:00 pm. PDT (-07:00)
    return { name: 'Season 4', number: 4, off_season: false }
  else if (time < 1496275200) // Wednesday, May 31 at 5:00 pm. PDT (-07:00)
    return { name: 'Off Season 4-5', number: 5, off_season: true }
  else if (time < 1503964800) // Monday, August 28 at 5:00 pm. PDT (-07:00)
    return {  name: 'Season 5', number: 5, off_season: false }
  else if (time < 1504224000) // Thursday, August 31 at 5:00 pm. PDT (-07:00)
    return { name: 'Off Season 5-6', number: 6, off_season: true }
  else
    return {  name: 'Season 6', number: 6, off_season: false }
}

export const _sr = (game, simple) => {
  return {
    diff: game.end_sr - game.start_sr,
    end: game.end_sr,
    name: game.rank || (simple ? simple.rank : null),
    start: game.start_sr
  }
}

export const _teams = game => {
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

export const _time = game => {
  return {
    start: game.game_started || game.time,
    end: game.game_ended || null,
    length: game.game_duration || game.duration
  }
}
