import rp from 'request-promise';

import config from '../const';
import heroStats from '../const/heroStats.json';

export const _get = (endpoint, url) => new Promise((resolve, reject) =>
  rp({
    url: encodeURI(`${url ? '' : config.api}${endpoint}`),
    json: true,
    //resolveWithFullResponse: true,
    //simple: false
  })
    .then(resolve)
    .catch(e => reject('OverTrack API request failed'))
);

// shared functions

export const _heroesPlayed = arr => arr.map(val => { return { hero: val[0], percent: val[1] } });
export const _map = json => { return { name: json.map, type: json.map_type || config._mapToType(json.map) } };
export const _score = arr => { return { blue: arr[0], red: arr[1] } };
export const _sr = json => { return { start: json.start_sr, end: json.end_sr, diff: json.end_sr - json.start_sr } };
export const _time = (start, end, length) => { return { start, end: end || start + length, length } };

const _result = (result, red) => {
  if (red)
    return result.replace(/loss/i, 'Victory').replace(/win/i, 'Defeat').replace(/draw/i, 'Draw').replace(/unknown/i, 'Unknown')
  else
    return result.replace(/loss/i, 'Defeat').replace(/win/i, 'Victory').replace(/draw/i, 'Draw').replace(/unknown/i, 'Unknown')
};

export const _teams= json => {
  if (json.teams) {
    return {
      blue: {
        score: json.score[0],
        outcome: _result(json.result),
        sr: json.avg_sr[0],
        players: json.teams.blue
      },
      red: {
        score: json.score[1],
        outcome: _result(json.result, true),
        sr: json.avg_sr[1],
        players: json.teams.blue
      }
    }
  } else {
    return {
      blue: {
        score: json.score[0],
        outcome: _result(json.result)
      },
      red: {
        score: json.score[1],
        outcome: _result(json.result, true)
      }
    }
  }
}

export const _specific = (json, hero) => {
  const arr = [];
  if (typeof json.hero_stat_1 == 'number') arr.push({ value: json.hero_stat_1, name: heroStats[hero][0] });
  if (typeof json.hero_stat_3 == 'number') arr.push({ value: json.hero_stat_3, name: heroStats[hero][2] });
  if (typeof json.hero_stat_5 == 'number') arr.push({ value: json.hero_stat_5, name: heroStats[hero][4] });
  if (typeof json.hero_stat_2 == 'number') arr.push({ value: json.hero_stat_2, name: heroStats[hero][1] });
  if (typeof json.hero_stat_4 == 'number') arr.push({ value: json.hero_stat_4, name: heroStats[hero][3] });
  if (typeof json.hero_stat_6 == 'number') arr.push({ value: json.hero_stat_6, name: heroStats[hero][5] });
  return arr;
}

export const _hero_statistics = h => {
  const result = {};
  if (h.ALL) {
    h.all = h.ALL;
    delete h.ALL;
  }
  Object.keys(h).forEach(key => {
    result[key] = {
      elims: h[key].elims,
      damage: h[key].damage,
      objective_kills: h[key].objective_kills,
      healing: h[key].healing,
      objective_time: h[key].objective_time,
      deaths: h[key].deaths,
      tab_health: h[key].tab_health,
      time_played: h[key].time_played,
      specific: _specific(h[key], key)
    }
  })
  return result;
};

export const _season = time => { // Timezone: 'America/Los_Angeles' Format: 'dddd, MMMM D [at] h:mm a. z (Z)'
  if (time < 1467154800) // Tuesday, June 28 at 4:00 pm. PDT (-07:00)
    return { number: 0, off_season: false, name: 'Competitive Play Preview' }
  else if (time < 1471478400) // Wednesday, August 17 at 5:00 pm. PDT (-07:00)
    return { number: 1, off_season: false, name: 'Season 1' }
  else if (time < 1472776680) // Thursday, September 1 at 5:38 pm. PDT (-07:00)
    return { number: 2, off_season: true, name: 'Off Season 1-2' }
  else if (time < 1479945600) // Wednesday, November 23 at 4:00 pm. PST (-08:00)
    return { number: 2, off_season: false, name: 'Season 2' }
  else if (time < 1480550400) // Wednesday, November 30 at 4:00 pm. PST (-08:00)
    return { number: 3, off_season: true, name: 'Off Season 2-3' }
  else if (time < 1487721600) // Tuesday, February 21 at 4:00 pm. PST (-08:00)
    return { number: 3, off_season: false, name: 'Season 3' }
  else if (time < 1488326400) // Tuesday, February 28 at 4:00 pm. PST (-08:00)
    return { number: 4, off_season: true, name: 'Off Season 3-4' }
  else if (time < 1496016000) // Sunday, May 28 at 5:00 pm. PDT (-07:00)
    return { number: 4, off_season: false, name: 'Season 4' }
  else if (time < 1496275200) // Wednesday, May 31 at 5:00 pm. PDT (-07:00)
    return { number: 5, off_season: true, name: 'Off Season 4-5' }
  else if (time < 1503964800) // Monday, August 28 at 5:00 pm. PDT (-07:00)
    return { number: 5, off_season: false, name: 'Season 5' }
  else if (time < 1504224000) // Thursday, August 31 at 5:00 pm. PDT (-07:00)
    return { number: 6, off_season: true, name: 'Off Season 5-6' }
  else
    return { number: 6, off_season: false, name: 'Season 6' }
};

// killfeed

export const _killicon = killicon => {
  if (!killicon) return null;
  return { hero: killicon[0], ability: killicon[1] }
};

export const _killfeed = json => json.killfeed.map(val => {
  const resurrect = Boolean(val[1] & 2);
  const is_left_blue = Boolean(val[1] & 1);
  if (resurrect)
    return {
      resurrect,
      timestamp: val[0],
      left: { hero: val[2], player: val[3], team: is_left_blue ? 'blue' : 'red' },
      right: { hero: val[4], player: val[5], team: is_left_blue ? 'blue' : 'red' }
    };
  else
    return {
      resurrect,
      timestamp: val[0],
      left: { hero: val[2], player: val[3], team: is_left_blue ? 'blue' : 'red' },
      right: { hero: val[4], player: val[5], team: is_left_blue ? 'red' : 'blue' },
      assisters: val[6],
      killicon: val[7] ? { hero: val[7][0], ability: val[7][1] } : null,
    };
});

// tab_statistics

export const _tab_statistics = val => {
  const result = [];
  for (var i = 0; i < val.hero.length; i++) {
    result[i] = {
      hero: val.hero[i],
      time: val.time[i],
      damage: val.damage[i],
      objective_kills: val.objective_kills[i],
      healing: val.healing[i],
      objective_time: val.objective_time[i],
      deaths: val.deaths[i],
      hero_stat_1: val.hero_stat_1[i],
      hero_stat_2: val.hero_stat_2[i],
      hero_stat_3: val.hero_stat_3[i],
      hero_stat_4: val.hero_stat_4[i],
      hero_stat_5: val.hero_stat_5[i],
      hero_stat_6: val.hero_stat_6[i]
    }
  }
  return result;
};